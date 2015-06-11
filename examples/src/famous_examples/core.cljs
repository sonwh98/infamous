(ns ^:figwheel-always famous-examples.core
  (:require [com.famous.Famous]
            [reagent.core :as reagent :refer [atom]]))

(enable-console-print!)


(def famous js/famous)
(def DOMElement (.. famous -domRenderables -DOMElement))
(def FamousEngine (.. famous -core -FamousEngine))

(def logo (.. FamousEngine createScene addChild))
(.. (DOMElement. logo (clj->js {"tagName" 'img})) (setAttribute "src" "./images/famous_logo.png"))

(.. logo
    (setSizeMode "absolute" "absolute" "absolute")
    (setAbsoluteSize 250 250)
    (setAlign 0.5 0.5)
    (setMountPoint 0.5 0.5)
    (setOrigin 0.5 0.5)
    )

(def spinner (.. logo (addComponent (clj->js {:onUpdate          (fn [time]
                                                                     (.. logo
                                                                         (setRotation 0 (/ time 1000.0))
                                                                         (requestUpdateOnNextTick spinner))
                                                                     (println "time=" time))
                                              :onMount           (fn [node]
                                                                     (println "onMount called: " (.. node getLocation))
                                                                     )
                                              :onTransformChange (fn []
                                                                     (println "onTransformChange called")
                                                                     )}
                                             ))))

(.. logo (requestUpdate spinner))
(.. FamousEngine init)

;(reagent/render [msg] (.. js/document (getElementById "msg")))