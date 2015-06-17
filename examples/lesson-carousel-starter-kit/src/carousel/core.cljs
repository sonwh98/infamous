(ns ^:figwheel-always carousel.core
    (:require [com.famous.Famous]))

(enable-console-print!)

(defonce famous js/famous)
(defonce DOMElement (.. famous -domRenderables -DOMElement))
(defonce FamousEngine (.. famous -core -FamousEngine))
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

(defn decorate-arrow-node [arrow-node text]
  (.. (DOMElement. arrow-node)
      (setProperty "color" "white")
      (setContent text)
      (setProperty "fontSize" "40px")
      (setProperty "lineHeight" "40px")
      (setProperty "cursor" "pointer")
      (setProperty "textHighlight" "none")
      (setProperty "zIndex" "2"))
  (.. (GestureHandler. arrow-node) (on "tap" (fn []
                                               (println text)))))

(defn decorate-dots [dots-node]
  (let [dot-nodes (.. dots-node getChildren)
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
                                                                       0)))))})]
    (doseq [dot-node dot-nodes]
      (.. (DOMElement. dot-node)
          (setProperty "borderRadius"  "5px")
          (setProperty "border"  "2px solid white")
          (setProperty "boxSizing"  "border-box")))

    (.. dots-node (addComponent resize))))

(defn create-dots [root-node]
  (let [root-dot (.. root-node addChild)]
    (doseq [i (range 5)
            :let [dot-node (.. root-dot addChild)]]
      (.. dot-node
          (setSizeMode ABSOLUTE  ABSOLUTE)
          (setAbsoluteSize 5 5)))
    (.. root-dot
        (setSizeMode ABSOLUTE ABSOLUTE)
        (setAbsoluteSize 20 20)
        (setPosition 0 -50 0)
        (setAlign 0.5 1 0)
        (setMountPoint .5, 1, 0))
    root-dot))

(defn create-pager [root-node]
  (let [pager-node (.. root-node addChild)
        simulation (PhysicsEngine.)
        url-base "http://demo.famo.us.s3.amazonaws.com/hub/apps/carousel/Museo_del_Prado_-_Goya_-_Caprichos_-_No._"
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
        image-elements (map (fn [image-name]
                              (let [_image-url (str url-base image-name)
                                    image-url (str "url('" _image-url "')")
                                    image-node (.. root-node addChild)
                                    el (DOMElement. image-node)
                                    box (FamousBox. {:mass 100 :size [100 100 100]})
                                    anchor (Vec3. 1 0 0)
                                    spring (Spring. nil box {:period 0.5 :dampingRatio 0.5 :anchor anchor})
                                    quaternion (.. (Quaternion.) (fromEuler 0  (/ (.. js/Math -PI) -2) 0))
                                    rotational-spring (RotationalSpring. nil  box {:period 1 :dampingRatio 0.2 :anchor quaternion})]
                                (.. image-node
                                    (setSizeMode ABSOLUTE ABSOLUTE ABSOLUTE)
                                    (setAbsoluteSize 500 500 0)
                                    (setAlign 0.5 0.5)
                                    (setMountPoint 0.5 0.5)
                                    (setOrigin 0.5 0.5))
                                (.. el
                                    (setProperty "backgroundImage"  image-url)
                                    (setProperty "background-repeat" "no-repeat")
                                    (setProperty "background-size" "cover"))
                                ))
                            image-names)
        _ (doall image-elements)
        pager {:node pager-node
               :onUpdate (fn [time]
                           (.. simulation (update time))

                           )
               }]
    pager-node
    )
  )

(defn Carousel [selector data]
  (let [context (.. FamousEngine (createScene selector))
        root-node (.. context addChild)
        back-node (.. root-node addChild)
        next-node (.. root-node addChild)
        dots-node (create-dots root-node)
        pager-node (create-pager root-node)

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
