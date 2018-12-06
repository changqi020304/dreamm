var ul =$("ul");
var lis=ul.find("li")
lis.click(function(){
    var curIndex=$(this).index();
    console.log(curIndex);
})