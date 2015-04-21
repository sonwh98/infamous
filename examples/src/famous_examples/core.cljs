(ns ^:figwheel-always famous-examples.core
    (:require [com.famous.Famous]))

(enable-console-print!)


;; translated from https://github.com/Famous/global-seed/blob/master/src/main.js

(defonce ImageSurface (.. js/famous -surfaces -ImageSurface))
(defonce Modifier     (.. js/famous -core -Modifier))
(defonce Transform    (.. js/famous -core -Transform))

(defonce logo
  (ImageSurface.
    (clj->js {"size" [200,200]
              "content" "https://pbs.twimg.com/profile_images/559761425766158336/Uq5W8iWA.jpeg"
              "classes" ["double-sided"]})))


(defonce initialTime (.. js/Date now)) 


(defonce center-spin-modifier
  (Modifier.
   (clj->js {"origin" [0.5 0.5]
             "align" [0.5 0.5]
             "transform" (fn[] (.. Transform (rotateY  (* .002 (- (.now js/Date) initialTime))) ))})))


(let [Engine         (.. js/famous -core -Engine)
      mainContext    (.. Engine createContext)]
  (.. mainContext (add center-spin-modifier) (add logo)))

