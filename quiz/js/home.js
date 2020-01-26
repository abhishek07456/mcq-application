function change(){
    val=document.getElementById('aggrement').checked;
    document.getElementById("start_test").disabled =!val;
}
jQuery(document).ready(function($){
    change();
});