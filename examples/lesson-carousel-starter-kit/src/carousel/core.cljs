(ns ^:figwheel-always carousel.core
    (:require [com.famous.Famous]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce GestureHandler (.. famous -components -GestureHandler))

(defn Arrow [node options]
  (let [direction (:direction options)
        arrow-direction (if (= direction 1)
                          ">"
                          "<")
        el (.. (DOMElement. node)
               (setProperty "color" "white")
               (setContent arrow-direction)
               (setProperty "fontSize" "40px")
               (setProperty "lineHeight" "40px")
               (setProperty "cursor" "pointer")
               (setProperty "textHighlight" "none")
               (setProperty "zIndex" "2"))]
    {:node      node
     :el        el
     :direction direction}))

(defn Carousel [selector data]
  (let [context (.. FamousEngine (createScene selector))
        root (.. context addChild)
        arrows {:back (Arrow. (.. root addChild) {:direction -1})
                :next (Arrow. (.. root addChild) {:direction 1})}
        carousel-obj {:context  context
                      :root     root
                      :arrows arrows}]

    carousel-obj))

(Carousel "body" {})
(.. FamousEngine init)
