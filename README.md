![](https://clojars.org/com.famous/famous/latest-version.svg)


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

You also need to include the famous.css stylesheet. I do not think this can be utilized from a Jar so you can use the copy included in /examples/resources/public/css or add a link in your markup
 ```
 <link href="http://code.famo.us/famous/0.3/famous.css" rel="stylesheet" type="text/css">
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
