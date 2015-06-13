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
        spacing (or (:spacing options) 5)
        dots (for [i (range numPages)
                   :let [dotNode (.. node addChild)]]
               (do
                 (.. dotNode
                     (setSizeMode 1 1)
                     (setAbsoluteSize dotWidth dotWidth))
                 (Dot dotNode)))
        layoutDots (fn [size]
                     (let [totalDotSize (+ (* dotWidth numPages)
                                           (* spacing (- numPages 1)))
                           start (->  (- (first size) totalDotSize) (/ 2))
                           ]
                       (doseq [i (range numbPages)
                               :let [x (+ start (* i (+ dotWidth spacing)))
                                     dot (nth dots i)]]
                         (..  (:node dot) (setPosition x 0 0 )))))
        dots-obj {:node node
                  :dots dots
                  :dotWidth dotWidth
                  :spacing  spacing
                  :numPages numPages}
        resizeComponent {:onSizeChange (fn [size]
                                         (layoutDots size))}
        ]
    (.. (first dots) select)
    (.. node (addComponent resizeComponent))
    dots-obj))


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
