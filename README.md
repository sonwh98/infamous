![](https://clojars.org/com.famous/famous/latest-version.svg)


## Use
This is not available on clojars yet so you must install it to your local maven repo with
```
lein install
```

Then in your project
In your project.clj dependencies
```
[com.famous/famous "0.5.1"]
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

or your terminal will go berserk on you.

see http://swannodette.github.io/2014/03/14/externs-got-you-down/


## sources
http://code.famo.us/famous/0.3/famous-global.js

http://code.famo.us/famous/0.3/famous-global.min.js
