# HamburgerMenu
<div>
<p><span style="font-size:16px"><span style="font-family:verdana,geneva,sans-serif">Hamburger Menu is a jQuery plugin for web applications on mobile devices.</span></span></p>

<p>&nbsp;</p>

<table border="0" cellpadding="1" cellspacing="40">
	<tbody>
		<tr>
			<td><img alt="" src="https://dl.dropboxusercontent.com/u/99957182/articlage/hamburgerMenu/screenshot/2015-06-18%2019.28.28.png" style="height: auto; width: 250px;" width="250px" height="auto"></td>
			<td><img alt="" src="https://dl.dropboxusercontent.com/u/99957182/articlage/hamburgerMenu/screenshot/2015-06-18%2020.48.17.png" style="height: auto; width: 250px;" width="250px" height="auto"></td>
		</tr>
	</tbody>
</table>

</div>

It is very easy to be used. Just add the following element to your HTML code:
```html
<div id="hamburgerMenu"></div>
```
And run the following javascript:
```javascript
$("#hamburgerMenu").hamburgerMenu({
			mainContent: 'mainContent',
		   
		}, [
			{"id":"Brain","href":"index.html","text":"Pinky"},
			{"id":"Spongebob","href":"Spongebob.html","text":"Sponge Bob"},
			{"id":"Ghostbusters","href":"Ghostbusters.html","text":"Ghostbusters"},
			{"id":"fraggle","href":"other.html","text":"Fraggle rock"}
		]
);
```
**mainContent**: It is the id of container that encapsulates the content of your page.

```html
<body>
	<div id="hamburgerMenu"></div>
	<div id="mainContent">
		here is the content of yout page.
	</div>
</body>
```

**more info:** https://www.articlage.com/adrianillo/article/hamburgermenu

**demo:** http://adrianillo.name/articlage/hamburgerMenu/index.html
