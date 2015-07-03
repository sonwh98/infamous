(ns ^:figwheel-always carousel.util
    (:require [cljs.core.async :refer [put! chan] ]
               [com.famous.Famous]))

(defonce famous js/famous)
(defonce GestureHandler (.. famous -components -GestureHandler))

(defn events->chan
      "Given a target DOM element and event type return a channel of
      observed events. Can supply the channel to receive events as third
      optional argument."
      ([node event] (events->chan node event (chan)))
      ([node event c]
        (.. (GestureHandler. node) (on event (fn []
                                                 (put! c event))))
        c))

(defmulti get-children
  (fn [v]
    (if (and (= (type v) PersistentVector)
             (> (count v) 2))
      (type v))))

(defmethod get-children PersistentVector [params]
  (nth params 2)
  )

(defmethod get-children :default [_]
  [])
