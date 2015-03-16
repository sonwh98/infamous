![](https://clojars.org/famous-cljs/latest-version.svg)


http://code.famo.us/famous/0.3/famous-global.js


http://code.famo.us/famous/0.3/famous-global.min.js



## Use

In your project.clj dependencies
```
[com.famous/famous "0.3"]
```

In your namespaces
```
(ns foo.core
    (:require [com.famous.Famous]))

```



##Todo: EXTERNS!!
The externs file is nowhere near finished. PRs greatly appreciated


Before running your code through advanced compilation, be sure to set

```
:closure-warnings {:externs-validation :off
                    :non-standard-jsdoc :off}}
```

or your terminal will go beserk on you.
