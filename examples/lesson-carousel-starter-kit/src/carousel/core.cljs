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

(defn Dot [node]
  (let [el (.. (DOMElement. node)
               (setProperty "borderRadius" "5px")
               (setProperty "border" "2px solid white")
               (setProperty "boxSizing" "border-box"))]
    {:node node
     :el el
     :select (fn []
               (.. el (setProperty "backgroundColor" "white")))
     :deslect (fn []
                (.. el (setProperty "backgroundColor" "transparent")))}))

(defn Dots [node options]
  (let [numPages (:numPages options)
        dotWidth (or (:dotWidth options) 10)
        dots (for [i (range numPages)
                   :let [dotNode (.. node addChild)]]
               (do
                 (.. dotNode (setSizeMode 1 1))
                 (.. dotNode (setAbsoluteSize dotWidth dotWidth))
                 (Dot dotNode)
                 ))
        resizeComponent {:onSizeChange (fn [size]
                                         )}]
    (.. (first dots) select)
    (.. node (addComponent resizeComponent))
    
    {:node node
     :dots dots
     :dotWidth dotWidth
     :spacing  (or (:spacing options) 5)
     :numPages numPages
     :layoutDots (fn [size]
                   )
     })
  )


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
