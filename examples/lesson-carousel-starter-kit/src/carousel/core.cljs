(ns ^:figwheel-always carousel.core
    (:require [com.famous.Famous]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce GestureHandler (.. famous -components -GestureHandler))

(defn Arrow [node options]
  (let [el (DOMElement. node)
        gestures (GestureHandler. node)
        direction (.. options -direction)
        arrow-direction (if (= direction 1)
                          ">"
                          "<")]
    (.. el (setProperty "color" "white"))
    (.. el (setContent arrow-direction))
    (.. el (setProperty "fontSize" "40px"))
    (.. el (setProperty "lineHeight" "40px"))
    (.. el (setProperty "cursor" "pointer"))
    (.. el (setProperty "textHighlight" "none"))
    (.. el (setProperty "zIndex" "2"))

    (.. gestures (on "tap" (fn []
                             (.. node (emit "pageChange" (clj->js {:direction direction})))
                             )))
    {:node      node
     :el        el
     :direction direction
     :gestures  gestures})

  )

(defn Dot [node]
  (let [el (DOMElement. node)]
    (.. el (setProperty "borderRadius" "5px"))
    (.. el (setProperty "border" "2px solid white"))
    (.. el (setProperty "boxSizing" "border-box"))

    {:node node
     :el el
     :select (fn []
               (.. el (setProperty "backgroundColor" "white")))
     :deselect (fn []
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
        carousel-obj {:context  context
                      :root     root
                      :pageData data
                      :arrows {:back (Arrow (.. root addChild) {:direction -1})
                               :next (Arrow (.. root addChild) {:direction 1})}}
        ]
    
    carousel-obj
    ))

(.. FamousEngine init)
