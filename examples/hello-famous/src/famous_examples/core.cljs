(ns ^:figwheel-always famous-examples.core
  (:require [com.famous.Famous]))

(enable-console-print!)


(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))

(defonce logo (.. FamousEngine createScene addChild))
(.. (DOMElement. logo (clj->js {"tagName" 'img})) (setAttribute "src" "./images/famous_logo.png"))

(.. logo
    (setSizeMode "absolute" "absolute" "absolute")
    (setAbsoluteSize 250 250)
    (setAlign 0.5 0.5)
    (setMountPoint 0.5 0.5)
    (setOrigin 0.5 0.5)
    )

(declare spinner-id)
(defonce spinner (clj->js {:onUpdate          (fn [time]
                                                  (.. logo
                                                      (setRotation 0 (/ time 1000.0))
                                                      (requestUpdateOnNextTick spinner-id)))
                           :onMount           (fn [node]
                                                  (println "onMount called: " (.. node getLocation))
                                                  )
                           :onTransformChange (fn []
                                                  ;(println "onTransformChange called")
                                                  )}
                          ))
(defonce spinner-id (.. logo (addComponent spinner)))
(.. logo (requestUpdateOnNextTick spinner-id))
(.. FamousEngine init)
