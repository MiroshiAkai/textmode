Textmode
=========

An interactive web textmode game using Javascript, with experimental desktop client.
Textmode supports all mayor browsers, with the exception of Internet Explorer.

Compilation instructions
-------

NOTE: The game can be played without following the instructions below, but will take a performance hit. The play the game without optimising it, just enter the "src" directory in the "game" directory and open "index.html" in your preferred browser.

Compilation requirements:
```
python 2
qmake
make
```

Step 1 (optimising the code)
=========

NOTE: Depending on your system, "python2" may be named "python" or something different. If "python2" does not work, try using "python" instead.

Go to the base directory and execute the following commands:
```
	cd game
	python2 build.py
```
The game has now been optimised. If you want to play it in your webbrowser, open the "build" directory in the "game" directory and open "index.html" if your preferred browser.

Step 2 (compiling the experimental desktop client)
=========

NOTE: This is only necessary if you want to try the experimental desktop client.

Execute the following commands
```
	cd ..
	qmake
	make
```
A client has now been compiled. This works on my Arch Linux system and, as soon as I have access to other systems, I will try it there as well.

Credits
-------

* Game by [Ruben van Os](https://github.com/TheLastProject).

* Many thanks to [Rod McFarland](http://thrind.xamai.ca/) for his original [CLI2](http://code.google.com/p/wordpress-cli/). The JavaScript CLI implementation in cli.js is a heavily modified version of the CLI2 client-side logic. CLI2 is Copyright © [Rod McFarland](http://thrind.xamai.ca/), 2006, 2007, 2008.

* Many thanks to [Max Goodman](https://github.com/chromakode) for the [xkcdfools](https://github.com/chromakode/xkcdfools) codebase.

* The bundled version of [YUI Compressor](http://developer.yahoo.com/yui/compressor/) is  Copyright (c) 2007-2009, [Yahoo! Inc](http://yahoo.com).

* The bundled version of [jsPDF](https://github.com/MrRio/jsPDF) is Copyright (c) 2010 [James Hall](https://github.com/MrRio).


License
-------

* The textmode code is released under the [GNU GPLv2](http://www.gnu.org/licenses/gpl-2.0.html).

* YUI Compressor is distributed under a [BSD license](http://developer.yahoo.com/yui/license.html), with [Rhino](http://www.mozilla.org/rhino/) components licensed under [MPL](http://www.mozilla.org/MPL/).

* jsPDF is distributed under a [MIT license](https://raw.github.com/MrRio/jsPDF/master/MIT-LICENSE.txt).
