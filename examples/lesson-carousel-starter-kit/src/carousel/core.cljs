(ns ^:figwheel-always carousel.core
    (:require [com.famous.Famous]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce GestureHandler (.. famous -components -GestureHandler))

(defn Carousel [selector data]
  (let [context (.. FamousEngine (createScene selector))
        root (.. context addChild)
        el (.. (DOMElement. root)
               (setContent "Hello Famous")
               (setProperty "font-size" "40px")
               (setProperty "color" "white"))
        carousel-obj {:context  context
                      :root     root
                      :el el}]    
    carousel-obj))

(Carousel "body" {})
(.. FamousEngine init)
