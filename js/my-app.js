// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;
var mySearchbar = $$('.searchbar')[0].f7Searchbar;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var MRIArray = [[2,1],[2,0],[1,0],[1,1],[0,0]];
var ABCD2Array=[["Low","1.0%","1.2%","3.1%"],["Moderate","4.2%","5.9%","9.8%"],["High","8.1%","11.7%","17.8%"]];

function calNIHSS() {	
	var a = document.NIHForm.elements; 
	var score = 0;
		for (var i=57; i--;) {  
			if (a[i].checked) { score += parseInt(a[i].value); } 
	   } 
	   document.getElementById('navbartitle').innerHTML= 'NIHSS = ' + score; 
}
function NIHReset() {
	document.NIHForm.reset();
	calNIHSS();
}
function calPHT() {
	if ((document.PHTForm.pht.value && document.PHTForm.alb.value) != "") {
		a = parseFloat(document.PHTForm.pht.value);
		b = parseFloat(document.PHTForm.alb.value);
		factor = (document.PHTForm.crcl.checked)?0.1:0.2;
		if ( document.PHTForm.SI.checked ) {
			pheny_conv = 1/3.96;
			alb_conv = .1;
			} else {
			pheny_conv=1;
			alb_conv=1;
		}	
		a *= pheny_conv;
		b *= alb_conv;
		c = a / ((factor*b)+0.1);
		c /= pheny_conv;
		document.PHTForm.corrpht.value = c.toFixed(1);
	}
}
function chgUnit () {
	if ( document.PHTForm.SI.checked ) {
   	document.getElementById('phtunit').innerHTML="&mu;mol/L";
   	document.getElementById('albunit').innerHTML="g/L";
   	document.getElementById('cphtunit').innerHTML="&mu;mol/L";
   	}
   	else {
   	document.getElementById('phtunit').innerHTML="mg/L";
   	document.getElementById('albunit').innerHTML="g/dL";
   	document.getElementById('cphtunit').innerHTML="mg/L";
   	}
	calPHT();
}

function listMRI(id) {
   if (id == 'stage' || id =='hgb') {
   	if (id == 'hgb') { document.MRIForm.MRIStage.selectedIndex = document.MRIForm.MRIHgb.selectedIndex; }
   	a = document.MRIForm.MRIStage.selectedIndex;
   	document.MRIForm.MRIT1.selectedIndex = MRIArray[a][0];
   	document.MRIForm.MRIT2.selectedIndex = MRIArray[a][1];
   	document.MRIForm.MRIHgb.selectedIndex = a;
	} else {
		if (id == 'T1') {
			if (document.MRIForm.MRIT1.selectedIndex==0) { document.MRIForm.MRIT2.selectedIndex=0 };
		}
		if (id == 'T2') {
			if (document.MRIForm.MRIT2.selectedIndex==1 && document.MRIForm.MRIT1.selectedIndex==0) {
				document.MRIForm.MRIT1.selectedIndex=1;
			}
		}
		b = document.MRIForm.MRIT1.selectedIndex;
		c = document.MRIForm.MRIT2.selectedIndex;
		for (var i=0; i<5; i++) {
			if ( MRIArray[i][0]==b && MRIArray[i][1]==c ) {
				document.MRIForm.MRIStage.selectedIndex = i;
				document.MRIForm.MRIHgb.selectedIndex = i;
				break;
			}
		}
	}
}
 
function calABCD2() {
	var score = 0;
	for (var i=4; i--;) {score += document.ABCD2Form.elements[i].selectedIndex; }
	if (score > 5) {risk = 2;} else if (score < 4) {risk = 0;} else {risk =1;}
   document.getElementById('ABCD2Score').innerHTML=score;
   document.getElementById('ABCD2Risk').innerHTML=ABCD2Array[risk][0];
   document.getElementById('ABCD22').innerHTML=ABCD2Array[risk][1];
   document.getElementById('ABCD27').innerHTML=ABCD2Array[risk][2];
   document.getElementById('ABCD290').innerHTML=ABCD2Array[risk][3];
}  

function caltPA(wtUnit) {
	if (wtUnit == 'lbs') {
    tPAwt = (parseFloat(document.tPAForm.wtlbs.value)/2.2046).toFixed(1);
		document.tPAForm.wtkg.value = tPAwt; 
		} else {
		tPAwt = parseFloat(document.tPAForm.wtkg.value);
		document.tPAForm.wtlbs.value = (tPAwt*2.2046).toFixed(0);
		}
		document.getElementById('PtWt').innerHTML= tPAwt;
		tPAdose = (0.9*tPAwt).toFixed(1);
		if (tPAdose > 90) { tPAdose = 90.0; }
		document.getElementById('tPAdraw').innerHTML= tPAdose;
		document.getElementById('tPAtotaldose').innerHTML= tPAdose;
		document.getElementById('tPAbolus').innerHTML= (tPAdose*0.1).toFixed(1);
		document.getElementById('tPAdiscard').innerHTML= (100 - tPAdose).toFixed(1);
		document.getElementById('tPArate').innerHTML= (tPAdose*0.9).toFixed(1);
}
 
// Callbacks to run specific code for specific pages, for example for About page:

