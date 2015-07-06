(ns ^:figwheel-always carousel.core
    (:require-macros [cljs.core.async.macros :refer [go]])
    (:require [com.famous.Famous]
              [carousel.util :refer [events->chan get-children]]
              [cljs.core.async :refer [>! <! put! chan alts!]]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce Node (.. famous -core -Node))
(defonce GestureHandler (.. famous -components -GestureHandler))
(defonce Size (.. famous -components -Size))

(defonce PhysicsEngine (.. famous -physics -PhysicsEngine))
(defonce physics (.. famous -physics))
(defonce math (.. famous -math))
(defonce FamousBox (.. physics -Box))
(defonce Spring (.. physics -Spring))
(defonce RotationalSpring (.. physics -RotationalSpring))
(defonce RotationalDrag (.. physics -RotationalDrag))
(defonce Quaternion (.. math -Quaternion))
(defonce Vec3 (.. math -Vec3))

(defonce ABSOLUTE (.. Size -ABSOLUTE))

(defn create-pages [root-node simulation]
  (let [url-base "http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._"
        image-names ["01_-_Autorretrato._Francisco_Goya_y_Lucientes2C_pintor_thumb.jpg"
                     "02_-_El_si_pronuncian_y_la_mano_alargan_al_primero_que_llega_thumb.jpg"
                     "03_-_Que_viene_el_Coco_thumb.jpg"
                     "04_-_El_de_la_rollona_thumb.jpg"
                     "05_-_Tal_para_qual_thumb.jpg"
                     "06_-_Nadie_se_conoce_thumb.jpg"
                     "07_-_Ni_asi_la_distingue_thumb.jpg"
                     "09_-_Tantalo_thumb.jpg"
                     "10_-_El_amor_y_la_muerte_thumb.jpg"
                     "11_-_Muchachos_al_avC3ADo_thumb.jpg"
                     "12_-_A_caza_de_dientes_thumb.jpg"
                     "13_-_Estan_calientes_thumb.jpg"]
        pages (map (fn [image-name]
                     (let [_image-url (str url-base image-name)
                           image-url (str "url('" _image-url "')")
                           image-node (.. root-node addChild)
                           el (DOMElement. image-node)
                           box (FamousBox. (clj->js {:mass 100 :size [100 100 100]}))
                           anchor (Vec3. 1 0 0)
                           spring (Spring. nil box (clj->js {:period 0.5 :dampingRatio 0.5 :anchor anchor}))
                           quaternion (.. (Quaternion.) (fromEuler 0 (/ (.. js/Math -PI) -2) 0))
                           rotational-spring (RotationalSpring. nil box (clj->js {:period 1 :dampingRatio 0.2 :anchor quaternion}))]
                       (.. image-node
                           (setSizeMode ABSOLUTE ABSOLUTE ABSOLUTE)
                           (setAbsoluteSize 500 500 0)
                           (setAlign 0.5 0.5)
                           (setMountPoint 0.5 0.5)
                           (setOrigin 0.5 0.5))
                       (.. el
                           (setProperty "backgroundImage" image-url)
                           (setProperty "background-repeat" "no-repeat")
                           (setProperty "background-size" "cover"))

                       {:node              image-node
                        :el                el
                        :box               box
                        :spring            spring
                        :quaternion        quaternion
                        :rotational-spring rotational-spring
                        :anchor            anchor}))
                   image-names)]
    (doseq [{:keys [box spring rotational-spring]} pages]
      (.. simulation (add box spring rotational-spring)))

    pages))

(defn make-tree []
  [:node {:id "root"}
   [[:node {:id            "back"
            :size-mode     [ABSOLUTE ABSOLUTE]
            :absolute-size [40 40]
            :align         [0 0.5 0]
            :position      [40 0 0]
            :mount-point   [0 0.5 0]
            :components    [[:DOMElement {:color         "white"
                                          :fontSize      "40px"
                                          :lineHeight    "40px"
                                          :cursor        "pointer"
                                          :textHighlight "none"
                                          :zIndex        "2"
                                          :content       "<"}]]}]
    [:node {:id            "next"
            :size-mode     [ABSOLUTE ABSOLUTE]
            :absolute-size [40 40]
            :align         [1 0.5 0]
            :position      [-40 0 0]
            :mount-point   [1 0.5 0]
            :components    [[:DOMElement {:color         "white"
                                          :fontSize      "40px"
                                          :lineHeight    "40px"
                                          :cursor        "pointer"
                                          :textHighlight "none"
                                          :zIndex        "2"
                                          :content       ">"}]]}]

    [:node {:id "pager"
            :align [0.5 0.5 0]
            :mount-point [0.5 0.5 0]}
     (let [url-base "http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._"
           image-names ["01_-_Autorretrato._Francisco_Goya_y_Lucientes2C_pintor_thumb.jpg"
                        "02_-_El_si_pronuncian_y_la_mano_alargan_al_primero_que_llega_thumb.jpg"
                        "03_-_Que_viene_el_Coco_thumb.jpg"
                        "04_-_El_de_la_rollona_thumb.jpg"
                        "05_-_Tal_para_qual_thumb.jpg"
                        "06_-_Nadie_se_conoce_thumb.jpg"
                        "07_-_Ni_asi_la_distingue_thumb.jpg"
                        "09_-_Tantalo_thumb.jpg"
                        "10_-_El_amor_y_la_muerte_thumb.jpg"
                        "11_-_Muchachos_al_avC3ADo_thumb.jpg"
                        "12_-_A_caza_de_dientes_thumb.jpg"
                        "13_-_Estan_calientes_thumb.jpg"
                        ]]
       (for [image-name image-names
             :let [url-base "http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._"
                   image-url (str url-base image-name)
                   url (str "url('" image-url "')")]]
         [:node {:size-mode     [ABSOLUTE ABSOLUTE ABSOLUTE]
                 :absolute-size [500 500 0]
                 :align         [0.5 0.5]
                 :mount-point   [0.5 0.5]
                 :origin        [0.5 0.5]
                 :components    [[:DOMElement {:backgroundImage   url
                                               :background-repeat "no-repeat"
                                               :background-size   "cover"}]]}]))]
    [:node {:id            "dots"
            :size-mode     [ABSOLUTE ABSOLUTE]
            :absolute-size [20 20]
            :position      [0 -50 0]
            :align         [0.5 1 0]
            :mount-point   [0.5 1 0]}
     (for [i (range 5)]
       [:node {:size-mode     [ABSOLUTE ABSOLUTE]
               :absolute-size [5 5]
               :components    [[:DOMElement {:borderRadius "5px"
                                             :border       "2px solid white"
                                             :boxSizing    "border-box"}]]}])]]])

(defn make-nodes [node-as-vec]
  (let [attributes (nth node-as-vec 1)
        node (Node.)
        size-mode (clj->js (:size-mode attributes))
        absolute-size (clj->js (:absolute-size attributes))
        align (clj->js (:align attributes))
        position (clj->js (:position attributes))
        components (:components attributes)
        mount-point (clj->js (:mount-point attributes))
        origin (clj->js (:origin attributes))
        children (get-children node-as-vec)]
    (.apply (.-setSizeMode node) node size-mode)
    (.apply (.-setAbsoluteSize node) node absolute-size)
    (.apply (.-setAlign node) node align)
    (.apply (.-setPosition node) node position)
    (.apply (.-setMountPoint node) node mount-point)
    (.apply (.-setOrigin node) node origin)

    (if-not (empty? components)
      (doseq [component components
              :let [dom-element (DOMElement. node)
                    properties (nth component 1)]]
        (doseq [p properties
                :let [name (name (first p))
                      value (second p)]]
          (if (= name "content")
            (.. dom-element (setContent value))
            (.. dom-element (setProperty name value))))))

    (if-not (empty? children)
      (doseq [n (nth node-as-vec 2)
              :let [a-child-node (make-nodes n)]]
        (.. node (addChild a-child-node))))

    node))


(defn Carousel []
  (let [simulation (PhysicsEngine.)
        context (.. FamousEngine (createScene "body"))
        tree (make-tree)
        root-node (make-nodes tree)
        _ (.. context (addChild root-node))
        children (.. root-node getChildren)

        back-node (nth children 0)
        back-clicks (events->chan back-node "tap")

        next-node (nth children 1)
        next-clicks (events->chan next-node "tap")

        pager-node (nth children 2)
        node-to-box (into {}  (for [page-node (.. pager-node getChildren)
                                    :let [box (FamousBox. (clj->js {:mass 100 :size [100 100 100]}))
                                          anchor (Vec3. 1 0 0)
                                          spring (Spring. nil box (clj->js {:period 0.5 :dampingRatio 0.5 :anchor anchor}))
                                          quaternion (.. (Quaternion.) (fromEuler 0 (/ (.. js/Math -PI) -2) 0))
                                          rotational-spring (RotationalSpring. nil box (clj->js {:period 1 :dampingRatio 0.2 :anchor quaternion}))
                                          _ (.. simulation (add box spring rotational-spring))]]
                                [page-node box]))
        
        dot-container-node (last children)
        dot-nodes (.. dot-container-node getChildren)
        resize (clj->js {:onSizeChange (fn [^Float32Array size]
                                         "NOTE: this call back is called only once because root-dot setSizeMode is ABSOLUTE (value of 1)"
                                         (let [size (IndexedSeq. size 0)
                                               dotWidth 10
                                               numPages 5
                                               spacing 5
                                               totalDotSize (+ (* numPages dotWidth)
                                                               (* spacing (dec numPages)))
                                               start-x (/ (- (nth size 0) totalDotSize)
                                                          2)]
                                           (doseq [n (range (count dot-nodes))
                                                   :let [dot-node (nth dot-nodes n)]]
                                             (.. dot-node (setPosition (+ start-x
                                                                          (* n
                                                                             (+ dotWidth spacing)))
                                                                       0
                                                                       0)))))})
        _ (.. dot-container-node (addComponent resize))
        current-index (atom 1)]

    ;; (add-watch current-index :watcher (fn [key atom old-index new-index]
    ;;                                     (let [old-page (nth pages old-index)
    ;;                                           new-page (nth pages new-index)]
    ;;                                       (.. (:anchor old-page) (set 1 0 0))
    ;;                                       (.. (:quaternion old-page) (fromEuler 0 (/ (.. js/Math -PI) -2) 0))
    ;;                                       (.. (:anchor new-page) (set 0 0 0))
    ;;                                       (.. (:quaternion new-page) (set 1 0 0 0)))))

    (go
      (while true
        (let [[v channel] (alts! [back-clicks next-clicks])]
          (cond
            (= channel back-clicks) (do
                                      (println "back" @current-index)
                                      (swap! current-index dec)
                                      )
            (= channel next-clicks) (do
                                      (println "next" @current-index)
                                      (swap! current-index inc)
                                      )))))
    
    
    ;; (.. FamousEngine (requestUpdate (clj->js {:onUpdate (fn [time]
    ;;                                                       (.. simulation (update time))
    ;;                                                       (doseq [page pages
    ;;                                                               :let [physics-transform (.. simulation (getTransform (:box page)))
    ;;                                                                     p (.. physics-transform -position)
    ;;                                                                     r (.. physics-transform -rotation)
    ;;                                                                     node (:node page)]]
    ;;                                                         (.. node
    ;;                                                             (setPosition (* 0 1446) 0 0)
    ;;                                                             (setRotation (nth r 0) (nth r 1) (nth r 2) (nth r 3))
    ;;                                                             )
    ;;                                                         )

    ;;                                                       (this-as this
    ;;                                                                (.. FamousEngine (requestUpdateOnNextTick this)))
    ;;                                                       )})))
    )

  )

(Carousel)
(.. FamousEngine init)
