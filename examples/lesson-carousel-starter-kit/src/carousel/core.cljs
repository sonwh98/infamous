(ns ^:figwheel-always carousel.core
    (:require [com.famous.Famous]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
(defonce GestureHandler (.. famous -components -GestureHandler))

(defn decorate-arrow-node [arrow-node text]
  (.. (DOMElement. arrow-node)
               (setProperty "color" "white")
               (setContent text)
               (setProperty "fontSize" "40px")
               (setProperty "lineHeight" "40px")
               (setProperty "cursor" "pointer")
               (setProperty "textHighlight" "none")
               (setProperty "zIndex" "2")))

(defn decorate-dots [dots-node]
  (let [dot-nodes (.. dots-node getChildren)
        resize (clj->js {:onSizeChange (fn [size]
                                         (println "onSizeChange " size)
                                         (let [dotWidth 10
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
                                                                       0)))))})]
    (.. dots-node (addComponent resize)))
  
  (let [dot-nodes (.. dots-node getChildren)]
    (doseq [dot-node dot-nodes]
      (.. (DOMElement. dot-node)
          (setProperty "borderRadius"  "5px")
          (setProperty "border"  "2px solid white")
          (setProperty "boxSizing"  "border-box")))

    ))

(defn create-dots [root-node]
  (let [root-dot (.. root-node addChild)]
    (doseq [i (range 5)]
      (.. root-dot addChild))
    
    root-dot))

(defn Carousel [selector data]
  (let [context (.. FamousEngine (createScene selector))
        root-node (.. context addChild)
        back-node (.. root-node addChild)
        next-node (.. root-node addChild)
        dots-node (create-dots root-node)

        back (decorate-arrow-node back-node "<")
        next (decorate-arrow-node next-node ">")
        dots (decorate-dots dots-node)
        carousel-obj {:context  context
                      :root     root-node
                      :back back-node
                      :next next-node
                      :dots dots}]
    (.. back-node
        (setSizeMode 1 1)
        (setAbsoluteSize 40 40)
        (setPosition 40 0 0)
        (setAlign 0 0.5 0)
        (setMountPoint 0 0.5 0))
    (.. next-node
        (setSizeMode 1 1)
        (setAbsoluteSize 40 40)
        (setPosition -40 0 0)
        (setAlign 1 0.5 0)
        (setMountPoint 1 0.5 0))
    carousel-obj))

(Carousel "body" {})
(.. FamousEngine init)
