(ns ^:figwheel-always com.kaicode.infamous
  (:require-macros [hiccups.core :as hiccups :refer [html]])
  (:require [com.kaicode.Famous]
            [reagent.core :as reagent]
            [cljs.core.async :refer [put! chan]]
            [datascript :as d]
            [hiccups.runtime :as hiccupsrt]))

(enable-console-print!)

(defonce famous js/famous)
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce Node (.. famous -core -Node))
(defonce GestureHandler (.. famous -components -GestureHandler))
(defonce PhysicsEngine (.. famous -physics -PhysicsEngine))

(defonce physics (.. famous -physics))
(defonce math (.. famous -math))

(defonce FamousBox (.. physics -Box))
(defonce Spring (.. physics -Spring))
(defonce RotationalSpring (.. physics -RotationalSpring))
(defonce Quaternion (.. math -Quaternion))
(defonce Vec3 (.. math -Vec3))

(defn get-famous-components [node]
      (.. (:node/famous-node node) getComponents))

(defn get-famous-component-by-type-name [node component-type-name]
      (let [famous-components (get-famous-components node)]
           (first (filter (fn [component]
                              (let [cn (.. component -constructor -name)]
                                   (= component-type-name cn)))
                          famous-components))))

(defonce famous-components {:DOMElement (.. famous -domRenderables -DOMElement)
                            :Align      (.. famous -components -Align)
                            :Camera     (.. famous -components -Camera)})

(defn- famous-compare [x y]
       "Compare famous javascript objects. See https://github.com/tonsky/datascript/issues/69"
       (let [str-x (.. js/JSON (stringify x))
             str-y (.. js/JSON (stringify y))]
            (compare str-x str-y)))

(extend-protocol IComparable
                 FamousBox (^number -compare [x y]
                                             (famous-compare x y))
                 Vec3 (^number -compare [x y]
                                        (famous-compare x y))
                 Quaternion (^number -compare [x y]
                                              (famous-compare x y))
                 Spring (^number -compare [x y]
                                          (famous-compare x y))
                 RotationalSpring (^number -compare [x y]
                                                    (famous-compare x y))
                 Node (^number -compare [x y]
                                        (famous-compare x y))

                 function (^number -compare [x y]
                                            (famous-compare x y))

                 PersistentArrayMap (^number -compare [x y]
                                                      (famous-compare x y))
                 )

(def schema {:node/id         {:db/unique :db.unique/identity}
             :node/children   {:db/cardinality :db.cardinality/many
                               :db/isComponent true
                               :db/valueType   :db.type/ref}
             :node/components {:db/cardinality :db.cardinality/many
                               :db/isComponent true
                               :db/valueType   :db.type/ref}
             :node/physics    {:db/cardinality :db.cardinality/one
                               :db/isComponent true
                               :db/valueType   :db.type/ref}})
(def conn (d/create-conn schema))

(defn save [datum]
      (d/transact! conn [datum]))

(defn get-node-by-id [id]
      (ffirst (d/q '[:find (pull ?node [*]) :in $ ?id :where [?node :node/id ?id]] @conn id)))

(defn events->chan
      "Given a node and event type return a channel of
      observed events. Can supply the channel to receive events as third
      optional argument."
      ([node event payload-function] (events->chan node event (chan) payload-function))
      ([node event c payload-function]
        (let [node (if (map? node)
                     (:node/famous-node node)
                     node)]
             (.. (GestureHandler. node) (on event (fn []
                                                      (put! c (or (payload-function) event))))))
        c))

(defn mount-component [reagent-component get-mount-element]

      (.. FamousEngine (requestUpdate (clj->js {:onUpdate (fn [time]
                                                              (println "mounting " (get-mount-element))
                                                              (let [element (get-mount-element)]
                                                                   (if element
                                                                     (reagent/render [reagent-component] element)
                                                                     (this-as this
                                                                              (.. FamousEngine (requestUpdateOnNextTick this))))))}))))

(defn- create-component [component-descriptor famous-node]
       (let [component-type (:component/type component-descriptor)]
            (if (keyword? component-type)
              (let [component-constructor (famous-components component-type)
                    component (if (= :DOMElement component-type)
                                (let [tag-name (:tag-name component-descriptor)
                                      options (clj->js {:tagName tag-name})]
                                     (component-constructor. famous-node options))
                                (component-constructor. famous-node))
                    style (:style component-descriptor)
                    attributes (dissoc component-descriptor :component/type :db/id :tag-name :style)]
                   (doseq [c style
                           :let [name (name (first c))
                                 value (second c)]]
                          (.. component (setProperty name value)))

                   (doseq [a attributes
                           :let [name (name (first a))
                                 value (second a)]]
                          (cond
                            (= name "content") (let [content (cond
                                                               (vector? value) (html value)
                                                               (fn? value) (let [id (:id attributes)
                                                                                 reagent-component value]
                                                                                (mount-component reagent-component #(.. js/document (getElementById id))))
                                                               :else value)
                                                     ]
                                                    (.. component (setContent content)))
                            (= name "id") (do (.. component (setId value)))
                            (= name "classes") (doseq [clz value]
                                                      (.. component (addClass clz)))
                            (= name "depth") (.. component (setDepth value))
                            :else (do
                                    (.. component (setAttribute name value))))

                          )
                   component)
              (let [component (clj->js component-descriptor)]
                   (.. famous-node (addComponent component))
                   component))))

(defn- attach-famous-node-to-scene-graph [node]
       (let [famous-node (Node.)
             size-mode (clj->js (:node/size-mode node))
             absolute-size (clj->js (:node/absolute-size node))
             align (clj->js (:node/align node))
             position (clj->js (:node/position node))
             mount-point (clj->js (:node/mount-point node))
             origin (clj->js (:node/origin node))
             proportional-size (clj->js (:node/proportional-size node))
             differential-size (clj->js (:node/differential-size node))
             ]
            (.apply (.-setSizeMode famous-node) famous-node size-mode)
            (.apply (.-setAbsoluteSize famous-node) famous-node absolute-size)
            (.apply (.-setAlign famous-node) famous-node align)
            (.apply (.-setPosition famous-node) famous-node position)
            (.apply (.-setMountPoint famous-node) famous-node mount-point)
            (.apply (.-setOrigin famous-node) famous-node origin)
            (.apply (.-setProportionalSize famous-node) famous-node proportional-size)
            (.apply (.-setDifferentialSize famous-node) famous-node differential-size)

            (doseq [child-node (:node/children node)
                    :let [a-child-node (attach-famous-node-to-scene-graph child-node)
                          a-famous-child-node (:node/famous-node a-child-node)]]
                   (.. famous-node (addChild a-famous-child-node)))

            (d/transact! conn [{:db/id            (:db/id node)
                                :node/famous-node famous-node}])

            (update-in node [:node/famous-node] #(identity famous-node))))


(defn- find-nodes-with-physics []
       (map #(first %) (d/q '[:find (pull ?node [*]) :where [?node :node/physics _]] @conn)))


(defn- find-nodes-with-components []
       (map #(first %) (d/q '[:find (pull ?node [*]) :where [?node :node/components _]] @conn)))

(defn render-scene-graph [scene-graph mount-element]
      "mount-element can be a dom id or a dom element"
      (save scene-graph)

      (let [root-id (:node/id scene-graph)
            simulation (PhysicsEngine.)
            scene-graph (attach-famous-node-to-scene-graph (get-node-by-id root-id))
            root-node (:node/famous-node scene-graph)
            physics-nodes (find-nodes-with-physics)
            nodes-with-components (find-nodes-with-components)
            context (.. FamousEngine (createScene mount-element))]
           (.. context (addChild root-node))

           (doseq [{physics :node/physics} physics-nodes]
                  (.. simulation (add (:box physics) (:spring physics) (:rotational-spring physics))))

           (doseq [{components :node/components :as node} nodes-with-components
                   :let [famous-node (:node/famous-node node)]]
                  (doseq [component-descriptor components]
                         (create-component component-descriptor famous-node)
                         )
                  )

           (.. FamousEngine (requestUpdate (clj->js {:onUpdate (fn [time]
                                                                   (.. simulation (update time))
                                                                   (doseq [pn physics-nodes
                                                                           :let [famous-node (:node/famous-node pn)
                                                                                 physics (:node/physics pn)
                                                                                 physics-transform (.. simulation (getTransform (:box physics)))
                                                                                 p (.. physics-transform -position)
                                                                                 r (.. physics-transform -rotation)]]
                                                                          (.. famous-node
                                                                              (setPosition (* (nth p 0) 1446) 0 0)
                                                                              (setRotation (nth r 0) (nth r 1) (nth r 2) (nth r 3))))

                                                                   (this-as this
                                                                            (.. FamousEngine (requestUpdateOnNextTick this)))
                                                                   )})))

           (.. FamousEngine init)))

(defn domready [handler]
      (.addEventListener js/window "DOMContentLoaded" handler))