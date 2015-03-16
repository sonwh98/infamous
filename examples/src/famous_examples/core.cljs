(ns ^:figwheel-always famous-examples.core
    (:require [com.famous.Famous]))

(enable-console-print!)


;; translated from https://github.com/Famous/global-seed/blob/master/src/main.js

(defonce ImageSurface (.-ImageSurface (.-surfaces js/famous)))
(defonce Modifier     (.-Modifier(.-core js/famous)))
(defonce Transform    (.-Transform (.-core js/famous)))

(defonce logo
  (ImageSurface.
    (clj->js {"size" [200,200]
              "content" "http://code.famo.us/assets/famous_logo.png"
              "classes" ["double-sided"]})))


(defonce initialTime (.now js/Date))


(defonce center-spin-modifier
  (Modifier.
   (clj->js {"origin" [0.5 0.5]
             "align" [0.5 0.5]
             "transform" (fn[] (.rotateY Transform (* .002 (- (.now js/Date) initialTime))))})))


(let [Engine         (.-Engine (.-core js/famous))
      mainContext    (.createContext Engine)]
  (.add (.add mainContext center-spin-modifier) logo))
