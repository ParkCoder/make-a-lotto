/**
 * make a lotto . js 
 * park kyung min - 2021
 * update - 2022.06 (jquery -> javascript)
 */

//게임 수
let count = 0;

//고정번호
let fixNbr_arr = [];

//제외번호
let excls_arr = [];

//고정번호, 제회번호 갯수
let chk;

// 로또 번호 테이블 html
let lottoTableHtml = '';

//선택번호 팝업 테이블 html
let selectTableHtml = '';

//선택번호 프린트 테이블 html
let printTableHtml = '';

//복사할 텍스트
let copytext = '';

// 요일 배열
let weekday = ['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];


window.onload = function() {
	/* console copy right */
	console.log('COPYRIGHT © 2021 Park Kyung Min. ALL RIGHT RESERVED');
	
	/* check box show */
//	const checkBoxs  = document.querySelectorAll("[type='checkbox']");
//	for (let checkBox of checkBoxs) {
//		checkBox.style.display ="inline-block";
//	}
	
	/* 복사되는 copyzone display none */
	const copyzone = document.getElementById("copyzone");
	copyzone.style.display ="none";
	
	
	/* 고정숫자 (fixNbr) click function */
	let fixNbrs = document.querySelectorAll("[name='fixNbr']");
	for (let fixNbr of fixNbrs) {
		fixNbr.addEventListener('click', fixNbrClick);
	}
	
	/* 제외숫자 (exclsNbr) click function */
	let exclsNbrs = document.querySelectorAll("[name='exclsNbr']");
	for (let exclsNbr of exclsNbrs) {
		exclsNbr.addEventListener('click', exclsNbrClick); 
	}
	
	let lotto_st_date = new Date('2002-12-01');
	console.log(displayedAt(lotto_st_date));
	
	
	
//	let td = new Date();
//	let tdDayOfWeek = td.getDay();
//	let tdDay = td.getDate();
//	let tdMonth = ('0' + (td.getMonth() + 1)).slice(-2);
//	let thisSatDay = td.getFullYear()+ tdMonth + ('0' + (tdDay + (6 - tdDayOfWeek))).slice(-2) + '2100';
//	console.log(thisSatDay);
//	
//	
//	let td2DayOfWeek = td.getDay();
//	let td2Day = td.getDate();
//	let td2Month = ('0' + (td.getMonth() + 1)).slice(-2);
//	let td2Year = td.getYear();
//	let hours = ('0' + td.getHours()).slice(-2); 
//	let minutes = ('0' + td.getMinutes()).slice(-2);
//	let seconds = ('0' + td.getSeconds()).slice(-2);
//	let nownow = td.getFullYear() + td2Month + td2Day + hours + minutes;
//	console.log(nownow);
//	
//	console.log(thisSatDay > nownow);
//	console.log(nownow > thisSatDay);
	
}

/* 고정숫자 5개 이상 선택 X click function */
function fixNbrClick() {
	let fixNbrChk = document.querySelectorAll("[name='fixNbr']:checked");
	chk = fixNbrChk.length;
	if(chk  > 5){
		alert('5개까지만 선택 가능합니다!');
		
		fixNbrChk.forEach((checkbox) => {
		    checkbox.checked = false;
		})
	}
}

/* 제외숫자 20개 이상 선택 X click function */
function exclsNbrClick() {
	let exclsNbrChk = document.querySelectorAll("[name='exclsNbr']:checked");
	chk = exclsNbrChk.length;
	if(chk  > 20){
		alert('20개까지만 선택 가능합니다!');
		
		exclsNbrChk.forEach((checkbox) => {
	    checkbox.checked = false;
	  })
	}
}

/*
 * 	고정 번호, 제외번호 팝업 관련 공통 function 
 * 
 * */

/* 고정,제외번호 팝업 open */
function fn_nbr_pop(obj) {
	
	let arrLength;
	let arry;
	
	if(obj == 'fixNbr'){
		fixNbr_arr = [];
		arry = excls_arr;
		arrLength = excls_arr.length;
	}else{
		excls_arr = [];
		arry = fixNbr_arr;
		arrLength = fixNbr_arr.length;
	}
	
	let nbrAll = document.querySelectorAll("[name='"+obj+"']");
	let nbrLength = nbrAll.length;
	
	let fixNbrArrlength = fixNbr_arr.length;
	
	if(arrLength != 0){
		for (let i = 1; i <= nbrLength; i++) {
			
			for (let j = 0; j < arrLength; j++) {
				
				let nbrId = document.getElementById(obj + i);
				
				if(nbrId.value == arry[j]){
					
					nbrId.disabled = true;
				}
			}	
		}
	}else{
		
		nbrAll.forEach((checkbox) => {
		    checkbox.disabled = false;
		})
	}
	
	document.getElementById(obj+"Pop").style.display ="block";
}

/* 고정, 제외번호 팝업 취소 button*/
function fn_cancel_nbr(obj) {
	
	let msg;
	
	if(obj == 'fixNbr'){
		msg = '고정번호';
	}else{
		msg = '제외번호';
	}
	
	const checkedLength = document.querySelectorAll("[name='"+obj+"']:checked").length //고정,제외번호 checked length
	
	if(checkedLength > 0){	//선택된 번호가 0이 아닐경우 취소시 array 비움
		
		if ( !confirm('선택된 '+msg+'가 해제됩니다!\n취소하시겠습니까?') ) return false;
	}
	
	
	let nbrAll = document.querySelectorAll("[name='"+obj+"']");
	nbrAll.forEach((checkbox) => {
	    checkbox.checked = false;
	})
	
	if(obj == 'fixNbr'){
		fixNbr_arr = [];
	}else{
		excls_arr = [];
	}
	
	document.getElementById(obj+"Div").innerHTML = "";
	document.getElementById(obj+"Pop").style.display ="none";
}

/* 고정, 제외번호 팝업 선택 button */
function fn_select_nbr(obj){
	
	let arry;
	let i_class;
	let src;
	
	if(obj == 'fixNbr'){
		arry = fixNbr_arr;
		src = 'images/icons/tick.png"';
	}else{
		arry = excls_arr;
		src = 'images/icons/cancel.png';
	}
	
	const checked_nbr = document.querySelectorAll("[name='"+obj+"']:checked");
	
	if(checked_nbr.length == 0){
		fn_cancel_nbr(obj);
		return false;
	}
	
	for (let checked of checked_nbr) {
		let val = checked.value;
		arry.push(val);
	}
	
	arry.sort(function(a, b) {
		return a - b;
	});
	
	let html = '<h1><img src="' + src + '" style="width:25px;">&ensp;' + arry + '</h1>';
	
	document.getElementById(obj + "Div").innerHTML = html;
	document.getElementById(obj + "Pop").style.display ="none";
}


/*
 * 	로또 번호 돌리기
 * 
 * */

// append html function
function appendHtml(el, str) {
	let div = document.createElement('div');
	 div.innerHTML = str;
	 while (div.children.length > 0) {
		 el.appendChild(div.children[0]);
	 }
}

/* 로또 생성 버튼 function */
function fn_lotto() {
	
	// 생성번호 관련 html 초기화
	lottoTableHtml = '';
	selectTableHtml = '';
	printTableHtml = '';
	copytext = '';
	
	//게임 수 this function for문 돌때 마다 + 1
	count = 0;
	
	//html 초기화
	document.getElementById("lottoTable").innerHTML = "";
	document.getElementById("selectLottoTable").innerHTML = "";
	document.getElementById("copytext").innerHTML = "";
	document.getElementById("selectDiv").remove();

	//선택 버튼 생성
	let selectDiv = '<div id="selectDiv" style="width: 100%; text-align: center;">';
	selectDiv += '<button id="selectBtn" type="button" class="btn" style="width: 330px; height: 70px; font-size: 23px; font-weight: bold; margin-top: 30px;" onclick="fn_select();">지금 번호 선택</button>';
	selectDiv += '</div>';
	appendHtml(document.getElementById("tableDIV"), selectDiv);
	
	//select value
	let game_cnt = document.getElementById("select_game").value;
	
	//선택한 게임 수 에 따라 게임 생성됨
	for (let i = 1; i <= game_cnt; i++) {
		fn_game();
	}
	
	// 생성번호 관련 html 추가
	document.getElementById("lottoTable").innerHTML = lottoTableHtml;
	document.getElementById("selectLottoTable").innerHTML = selectTableHtml;
	document.getElementById("printLottoTb").innerHTML = printTableHtml;
	document.getElementById("copytext").innerHTML = copytext;
	
	// 숫자별 lotto ball 색상 변경
	let balls  = document.querySelectorAll(".lotto_mball");
	
	for (let ball of balls) {
		const ballNbr = ball.innerText;

		if (ballNbr < 10) {
			ball.style.backgroundColor = 'rgb(251, 196, 0)';
		} else if (ballNbr < 20) {
			ball.style.backgroundColor = 'rgb(105, 200, 242)';
		} else if (ballNbr < 30) {
			ball.style.backgroundColor = 'rgb(255, 114, 114)';
		} else if (ballNbr < 40) {
			ball.style.backgroundColor = 'rgb(170, 170, 170)';
		} else if (ballNbr <= 45) {
			ball.style.backgroundColor = 'rgb(179, 225, 52)';
		}
		
	}
}


/* 코멘트 생성 */
function fn_select_comment() {
	
	let comments = [
		'1st1' ,'1st2' ,'1st3'													// 3개 good
		,'2nd1' ,'2nd2'															// 2개 good
		,'dallor-coin'															// 1개 good
		,'jew-dia'																// 1개 good
		,'money1', 'money2', 'money3', 'money4', 'money5', 'money6', 'money7'	// 7개 good
		,'sad1', 'sad2', 'sad3', 'sad4'											// 4개 bad
		,'sad-girl', 'sad-men'													// 2개 bad
		,'won-coin', 'won-coins'												// 2개 good
		,'like'																	// 1개 good
		,'dislike1', 'dislike2'													// 2개 bad
		,'bad1'																	// 1개 bad
		,'sorry1' ,'sorry2' ,'sorry3'											// 3개 bad
		,'angry1' ,'angry2' ,'angry3'											// 3개 bad
		,'rich1','rich2' ,'rich3' ,'rich4' ,'rich5'								// 5개 good
		,'poor1','poor2' ,'poor3' ,'poor4' ,'poor5'								// 5개 bad
		,'winner1'																// 1개 good
		,'skull1','skull2' ,'skull3' ,'skull4'									// 4개 bad
		,'rip1','rip2' ,'rip3' ,'rip4'											// 4개 bad
		,
		]; 																		
	
	// good : 23개
	// bad : 28개
	
	let comment_index = Math.floor(Math.random() * comments.length);
	
	let ment = document.getElementById("ment");
	let result_img = '<img class="result-img" src="images/icons/'+comments[comment_index]+'.png" />';
	
	for (let i = 0; i < 5; i++) {
		result_img += '<img class="result-img" src="images/icons/'+comments[comment_index]+'.png" />';
	}
	
	ment.innerHTML = result_img;
}

/* 로또 번호 생성 */
function fn_game() {
	
	// 화면에 표시될 코멘트
	fn_select_comment();
	
	
	let numbers = [];
	
	// 로또 번호 생성 START
	// 1) 고정번호나 제외번호가 없으면 경우
	if(fixNbr_arr.length == 0 && excls_arr.length == 0){ 
		for (i = 1; i <= 6; i++) {
			let num = Math.floor(Math.random() * 45) + 1; // 1~45 까지
			if (numbers.indexOf(num) === -1) {			// 앞의 숫자랑 비교해 중복값 제거
				numbers.push(num);
			} else {
				i--;
			}
		}
		numbers.length = 6;
		
		numbers.sort(function(a, b) {
			return a - b;
		});
	
		
	// 2) 고정 + 제외 번호
	} else if (fixNbr_arr.length != 0 && excls_arr.length != 0){ 
		//로또 1~ 45생성, 고정번호 배열에 넣고, 1~45에서 고정번호+제외번호 제거 하고 랜덤
		
		let lottoNum = [];
		for (let i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}
		
		let index;
		let a_num;
		
		// 생성번호 배열에서 고정번호 제거, 로또번호에 고정번호 push
 		for (let i = 0; i < fixNbr_arr.length; i++) {
			
 			a_num = fixNbr_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
			
			numbers.push(a_num);
		}
		
		let index2;
		let b_num;
		
		//제외번호 제거
 		for (let i = 0; i < excls_arr.length; i++) {
			
 			b_num = excls_arr[i];
			
			index2 = lottoNum.indexOf(b_num-1+1);
			
			if(index2 > -1){
				lottoNum.splice(index2, 1);
			}
		}
		
 		let notNumLeng = excls_arr.length;
		let myNumLeng = fixNbr_arr.length;
		let leng = notNumLeng + myNumLeng;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = myNumLeng; i < 6; i++) {
			
			let num = Math.floor(Math.random() * (45 - leng));
			
			let num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
		
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	// 3) 고정번호
	} else if(fixNbr_arr.length != 0) {
		// 번호생성 (1~45)
		let lottoNum = [];
		for (let i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}	
		
		let index;
		let a_num;
		
		// 생성번호 배열에서 고정번호 제거, 로또번호에 고정번호 push
 		for (let i = 0; i < fixNbr_arr.length; i++) {
			
 			a_num = fixNbr_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
			
			numbers.push(a_num);
		}

		
		
		let myNumLeng = fixNbr_arr.length;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = myNumLeng; i < 6; i++) {
			
			let num = Math.floor(Math.random() * (45 - myNumLeng));
			
			let num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
		
		//sort 오름차순
		numbers.sort(function(a, b) {
			return a - b;
		});
	
	// 4) 제외번호
	} else if(excls_arr.length != 0){ 
		
		// 번호 생성 배열 1~45
		let lottoNum = [];
		for (let i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}
		
		let index;
		let a_num;
		
		//제외번호 제거
 		for (let i = 0; i < excls_arr.length; i++) {
			
 			a_num = excls_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
		}
 		
		let notNumLeng = excls_arr.length;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = 0; i < 6; i++) {
			
			let num = Math.floor(Math.random() * (45 - notNumLeng));
			
			let num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
 		
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	}// 로또 번호 생성 END
	
	
	// 화면에 뿌릴 html 생성 START
	count += 1; // 게임 번호 증가
	
	let games;
	
	if(count == 1){	games = 'A'; }
	if(count == 2){	games = 'B'; }
	if(count == 3){	games = 'C'; }
	if(count == 4){ games = 'D'; }
	if(count == 5){	games = 'E'; }
	
	let lotto_num;	//로또 번호
	let cnt;		//구분을 위한 count
	
	// 로또 번호 테이블
	lottoTableHtml += '<tr style="text-align: center;">';
	lottoTableHtml += '<td><h2>' + games + '</h2></td>';
	lottoTableHtml += '<td style="text-align: center;">';

	for (let i = 0; i < numbers.length; i++) {

		lotto_num = numbers[i];
		cnt = i + 1;

		lottoTableHtml += '<div class="lotto_mball" id="mball_'+ count + cnt + '">' + numbers[i] + '</div>';
	}

	lottoTableHtml += '</td></tr>';
	
	
	//선택번호 확인 팝업 테이블
	selectTableHtml += '<tr>';
	selectTableHtml += '<td><span>' + games + '</span></td>';
	selectTableHtml += '<td>'
	for (let i = 0; i < numbers.length; i++) {

		lotto_num = numbers[i];
		cnt = i + 1;

		selectTableHtml += '<span class="wd80" style="display:inline-block;">' + ('0' + numbers[i]).slice(-2) + '</span>';

	}
	selectTableHtml += '</td></tr>';
	
	
	
	//프린트 div 테이블
	printTableHtml += '<tr>';
	printTableHtml += '<td><span>' + games + '</span></td>';
	printTableHtml += '<td>'
	for (let i = 0; i < numbers.length; i++) {

		lotto_num = numbers[i];
		cnt = i + 1;

		printTableHtml += '<span style="display:inline-block; width:41px;">' + ('0' + numbers[i]).slice(-2) + '</span>';

	}
	printTableHtml += '</td></tr>';
	
	//복사할 번호 text
	copytext += '' + games + ' : ';
	
	for (let i = 0; i < numbers.length; i++) {

		lotto_num = numbers[i];
		cnt = i + 1;
		
		if(i != 5){
			copytext += numbers[i] + ', ';
		}else{
			copytext += numbers[i];
			copytext += '\n';
		}

	}
	// 화면에 뿌릴 html 생성 END
}

/* 게임 수 바꾸면 테이블 초기화 */
function fn_change() {
	
	// 게임 수 초기화
	count = 0;
	
	// 테이블 html
	let html = '<tr style="text-align: center;">';
		html += '<td colspan="2" style="font-weight: bold; font-size: 25px;">번호 생성 하기 버튼을 눌러주세요!!</td>';
		html += '</tr>';

	// 테이블 초기화
	document.getElementById("lottoTable").innerHTML = html;
	
	//복사 문구 초기화
	document.getElementById("copytext").innerHTML = '';
	
	let selectDiv = '<div id="selectDiv" style="width: 100%; text-align: center;"></div>';
	appendHtml(document.getElementById("tableDIV"), selectDiv);
	
	document.getElementById("selectDiv").remove();
	
}


/*
 *  지금 번호 선택
 * 
 * */
/* 지금 번호 선택 팝업 */
function fn_select() {
	
	let now = new Date();
	let nowDayOfWeek = now.getDay();
	let nowDay = now.getDate();
	let nowMonth = ('0' + (now.getMonth() + 1)).slice(-2);
	let nowYear = now.getYear();
	let hours = ('0' + now.getHours()).slice(-2); 
	let minutes = ('0' + now.getMinutes()).slice(-2);
	let seconds = ('0' + now.getSeconds()).slice(-2); 
	
	
	let thisWeekSaturday = now.getFullYear()+ "/" +nowMonth + "/" + ('0' + (nowDay + (6 - nowDayOfWeek))).slice(-2); // 추첨일 (해당 주 토요일)
	let lastday = (now.getFullYear()+1)+ "/" +nowMonth + "/" + ('0' + (nowDay + (6 - nowDayOfWeek) + 1)).slice(-2);  // 지급기간 (추첨 1년 뒤)
	let today = now.getFullYear() + "/" +nowMonth + "/" + ('0' + nowDay).slice(-2);									 // 발행일
	let resultTime = hours + ':' + minutes  + ':' + seconds;
	
	thisSat = now.getFullYear()+ "-" +nowMonth + "-" + ('0' + (nowDay + (6 - nowDayOfWeek))).slice(-2)
	
	//show div
	document.getElementById("day_issue").innerText = today + " " + weekday[nowDayOfWeek] + " " + resultTime;
	document.getElementById("day_lottery").innerText = thisWeekSaturday + " " +weekday[6];
	document.getElementById("day_limit").innerText = lastday;
	
	//print div
	document.getElementById("p_day_issue").innerText = today + " " + weekday[nowDayOfWeek] + " " + resultTime;
	document.getElementById("p_day_lottery").innerText = thisWeekSaturday + " " +weekday[6];
	document.getElementById("p_day_limit").innerText = lastday;
	
	let game_cnt = document.getElementById("select_game").value;
	//show div
	document.getElementById("howMuch").innerText = "￦ " + game_cnt + ",000";
	//print div
	document.getElementById("p_howMuch").innerText = "￦ " + game_cnt + ",000";
	
	document.getElementById("selectLotto").style.display ="block";
}

/* 확인 ( 닫기 )*/
function fn_close() {
	document.getElementById("selectLotto").style.display ="none";
}

/* 번호 복사 */
function copyNumber() {
	let text = document.getElementById("copytext").innerHTML;
	
	let result = text.slice(0, -1);
	
	let area = document.createElement("textarea");
	
	document.body.appendChild(area);
	
	area.value= result;
	area.select();
	
	document.execCommand("copy");
	
	document.body.removeChild(area);

	alert('클립보드에 복사되었습니다.');
}

/* 인쇄 */
function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

let thisSat;
function displayedAt(createdAt) {
	  const milliSeconds = new Date() - createdAt
	  const seconds = milliSeconds / 1000
	  const minutes = seconds / 60
	  const hours = minutes / 60
	  const days = hours / 24
	  const weeks = days / 7
	  
	  return Math.floor(weeks) + '주 전'
	}