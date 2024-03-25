function Validate(){
    var form = document.forms['regis'];
    var ht = form.name;
    var ns = form.birthday;
    var dc = form.address;
    var sdt = form.phone;
    var email = form.email;
    var mk = form.password;
    var prmk = form.prepassword;

    if(ht.value.length == 0){
        alert("Họ tên không được bỏ trống!");
        ht.focus();
        return false; 
    }
    if(ns.value.length == 0){
        alert("Ngày sinh không được bỏ trống!");
        ns.focus();
        return false; 
    }
    if (new Date(ns.value).getTime() > new Date().getTime()) {
        alert('Ngay sinh phai nhỏ hơn ngày hiện tại!');
        ns.focus();
        return false;
      }
    if(!/^\d{10}$/.test(sdt.value)){
        alert("Định dạng số điện thoại chưa đúng!");
        sdt.focus();
        return false;
    }
    if(dc.value.length == 0){
        alert("Địa chỉ không được bỏ trống!");
        dc.focus();
        return false; 
    }
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(email.value)){
        alert("E-mail chưa đúng định dạng!")
        email.focus();
        return false;
    }
    if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(mk.value)){
        alert("Mật khẩu chưa đủ mạnh!");
        mk.focus();
        return false;
    }
    if(mk.value != prmk.value){
        alert("Mật khẩu chưa khớp!");
        prmk.focus();
        return false;
    }
    return true;
}

var regfrm = document.forms['regis'];
    regfrm?.addEventListener('submit', function (e) {
        e.preventDefault();
});

var arr = [];
// Nút đăng ký
var nut = document.querySelector('#submit');
nut?.addEventListener('click', function () {
    if (Validate()) {
        let issubmit = true;
        arr = JSON.parse(localStorage.getItem('login')) || [];
        var user = {
            mail: regfrm.email.value, mk: regfrm.password.value
        }
        if (arr.length > 0) {
            arr.forEach(element => {
                if (element.mail == user.mail) {
                    alert("Email đã tồn tại!");
                    issubmit = false;
                    return;
                } else { issubmit = true; }
            });
        }
        if (issubmit == true) {
            arr.push(user);
            window.localStorage.setItem('login', JSON.stringify(arr));
            regfrm.submit;
            alert("Đăng ký thành công!");
        }
    }
});

var logfrm = document.forms['login'];
logfrm?.addEventListener('submit', function (e) {
    e.preventDefault();
});
//Nút đăng nhập
var button = document.querySelector('#submitLog');
let arrLg = [];
function checkLogin() {
    var log_user = logfrm.email.value;
    var log_psw = logfrm.psw.value;
    arrLg = JSON.parse(localStorage.getItem('login')) || [];
    if (Array.isArray(arrLg)) {
        let check = false;
        arrLg.forEach((element, index) => {
            if (element.mail == log_user && element.mk == log_psw) {
                check = true;
                return;
            } 
        });
        if (check) {
            alert("Đăng nhập thành công");
            window.location.href = 'index.html';
        } else {
            alert("Email hoặc mật khẩu không đúng");
        }
    }
}
button?.addEventListener('click', checkLogin);

function checkKeySearch(e)
{
    var key = event.which || event.keyCode;
    if(key == 32)
        doSearch();
}

function doSearch()
{
    var frm = document.forms['frm-search'];
    if(frm.words.value.length>0)
        frm.submit();
}

function showSearch(){
    var url = new URL(window.location);
    var ws = url.searchParams.get("words");
    document.getElementById("showinfo").innerHTML="<h1>Từ khóa tìm kiếm: </h1><b>"+ws+"</b>";
}

var itemList={	"sp001":{"name":"TOKYO REVENGERS","price":376000,"photo":"img/truyện 1.jpg"},
				"sp002":{"name":"JUJUTSU KAISEN","price":269000,"photo":"img/truyện 2.webp"},
				"sp003":{"name":"KIMETSU YAIBA","price":365000,"photo":"img/truyện 3.jpg"},
				"sp004":{"name":"ATTACK ON TITAN","price":234000,"photo":"img/truyện 4.jpg"},
				"sp005":{"name":"MAIRIMASHITA IRUMA-KUN","price":252000,"photo":"img/truyện 5.jpg"},
				"sp006":{"name":"DR.STONE","price":249000,"photo":"img/truyện 6.jpg"},
				"sp007":{"name":"BLUE LOCK","price":145000,"photo":"img/truyện 7.jpeg"},
				"sp008":{"name":"DRAGON BALL","price":121000,"photo":"img/truyện 8.jpg"},
				"sp009":{"name":"KINGDOM","price":83000,"photo":"img/truyện 9.jpg"},
				"sp0010":{"name":"DETACTIVE CONAN","price":245000,"photo":"img/truyện 10.png"},
				"sp0011":{"name":"AO ASHI","price":70000,"photo":"img/truyện 11.webp"},
				"sp0012":{"name":"KOMI SAN","price":66000,"photo":"img/truyện 12.jpg"},
			   };


function addCart(code)
{
    var number = parseInt(document.getElementById(code).value);
    var name = itemList[code].name;
    if(number==0)return;
    if(typeof localStorage[code] === "undefined"){
        window.localStorage.setItem(code,number);
    }else{
        var current=parseInt(window.localStorage.getItem(code));
        if(number+current>100)
        {
            window.localStorage.setItem(code,100);
            alert('Số lượng đã vượt 100!');
            return;
        }
        else
            window.localStorage.setItem(code,number+current);
    }
    alert('Đã cập nhật '+ name +' với số lượng '+ number +' vào giỏ hàng');

}
//mở trang shoppingcart.html
function openCart(){
    window.location.href = "shoppingcart.html";
}
//tính giảm giá
function getDiscountRate()
{
    var d=new Date();//lấy ngày hiện tại của máy tính
    var weekday=d.getDay();//lấy ngày trong tuần
    var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút tương đối trong ngày
    if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
        return 0.1;
    return 0;
}
//hiển thị giỏ hàng
function showCart()
{
    var formatter = new Intl.NumberFormat('vi-VN',{
        style: 'currency',
        currency: 'VND'
    });
    var container=document.getElementById('cartDetail').getElementsByTagName('tbody')[0];
    container.innerHTML="";
    var sum=0;
    var totalPreTax=0;
    var discountRate=getDiscountRate();
    var taxRate=0.1;
    var discount=0;
    var tax=0;
    for(var i=0; i<window.localStorage.length; i++)
    {
        if(typeof itemList[localStorage.key(i)] === "undefined")
            continue;
        
        var tr=document.createElement("tr");
        var photoCell=document.createElement("td");
        var nameCell=document.createElement("td");
        var numberCell=document.createElement("td");
        var priceCell=document.createElement("td");
        var sumCell=document.createElement("td");
        var removeCell=document.createElement("td");
        var removeLink=document.createElement("a");
       
        var item=itemList[localStorage.key(i)];
        var number=localStorage.getItem(localStorage.key(i));

        photoCell.style.textAlign="center";
        photoCell.innerHTML='<img src="'+item.photo+'" class="grid wide" width="100px">';
        nameCell.innerHTML=item.name;
        priceCell.innerHTML=formatter.format(item.price);
        priceCell.style.textAlign="center";

        numberCell.innerHTML=number;
        numberCell.style.textAlign="center";

        sum=number*item.price;
        sumCell.innerHTML=formatter.format(sum);
        sumCell.style.textAlign="center";

        removeLink.innerHTML='<i class="fa fa-trash icon"></i>';
        removeLink.setAttribute("href","#");
        removeLink.setAttribute("data-code",localStorage.key(i));

        removeLink.onclick=function(){
            removeCart(this.dataset.code);
        };


        removeCell.style.textAlign="center";
        removeCell.appendChild(removeLink);

        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell);
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(removeCell);
        
        container.appendChild(tr);
        totalPreTax+=sum;
    }

    var discount=totalPreTax*discountRate;
    var tax=(totalPreTax-discount)*taxRate;
    document.getElementById('bill_pre_tax_total').innerHTML=formatter.format(totalPreTax);
    document.getElementById('bill_tax').innerHTML=formatter.format(tax);
    document.getElementById('bill_total').innerHTML=formatter.format(totalPreTax-discount+tax);
}
//xóa thông tin giỏ hàng
function removeCart(code)
{
    if(typeof window.localStorage[code] !== "undefined")
    {
        window.localStorage.removeItem(code);
        document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
        showCart();
    }
}
