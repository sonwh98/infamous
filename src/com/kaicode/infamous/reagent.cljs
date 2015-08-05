(ns ^:figwheel-always com.kaicode.infamous.reagent
  (:require [com.kaicode.Famous]
            [com.kaicode.infamous :as infamous :refer [famous]]
            [reagent.core :as reagent]
            [cljs.core.async :refer [put! chan]]
            [datascript :as d]))


(defn mount-component [reagent-component get-mount-element]
      (.. infamous/FamousEngine (requestUpdate (clj->js {:onUpdate (fn [time]
                                                                       (let [element (get-mount-element)]
                                                                            (if element
                                                                              (reagent/render [reagent-component] element)
                                                                              (this-as this
                                                                                       (.. infamous/FamousEngine (requestUpdateOnNextTick this))))))}))))