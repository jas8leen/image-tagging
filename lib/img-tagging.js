  var imgTagging=(function() {

    
    var imageClass = ".img-tag-img";
    var heightOfSelection = 10;
    var widthOfSelection = 10;

  



  var savedData = [];

 var intialisation = function(className){

    var img = $(className);

    // Create Required HTML After the given image.
    var $imgContainer = $(".img-tag-container");
    var $tagCreatorContainer = $(".img-tag-creator-container");
    
    var $hoverCreator = $(".img-tag-hover-creator");
    var $hoverContainer = $(".img-tag-hover-container");
    var $saveButton = $(".img-tag-save");
    var $cancelButton = $(".img-tag-cancel");

    // PopUp variables
    var $savePopup = $("#savePopup");
    var $cancelPopup = $("#cancelPopup");
    var $popupName = $("#popup-name");
    var $popupUrl = $("#popup-url");
    var $popupImageUrl = $("#popup-imageUrl");

    $cancelButton.click(function(e){
        window.location.reload();
    });

    $saveButton.click(function(e){
        $hoverContainer.show();
        $('.img-tag-hover-object').show();
        alert("Save the date using Ajax. Data is: ");
        alert(JSON.stringify(savedData));
    });

    // Bind the click function on the given image.
    img.unbind("click");
    img.click(function(e) {
      console.log(e.target);
      $popupName.val("");
      $popupUrl.val("");
      $popupImageUrl.val("");
      var posX = $(this).parent().offset().left;
      var posY = $(this).parent().offset().top;
      var mouseX = e.pageX - (posX + (widthOfSelection/2));// width of the box is 100
      var mouseY = e.pageY - (posY + (heightOfSelection/2));// height of the box is 100
      $tagCreatorContainer.css({ top:mouseY, left:mouseX, display:"block"});
    });


    $savePopup.click(function(){
          console.log("Jaspinder");
          var name = $popupName.val();
          var url = $popupUrl.val();
          var imageUrl = $popupImageUrl.val();
          if(name && url && imageUrl){
            saveTag(className);
          }
          $tagCreatorContainer.css({display:'none'});
      });

    $cancelPopup.click(function(){
          $popupName.val("");
          $popupUrl.val("");
          $popupImageUrl.val("");
          $tagCreatorContainer.css({display:'none'});
    })

  }




  var saveTag = function(className){  

      var img = $(className);

      // Create Required HTML After the given image.
      var $imgContainer = $(".img-tag-container");
      var $tagCreator  = $(".img-tag-creator-container");

      var $hoverCreator = $(".img-tag-hover-creator");
      var $hoverContainer = $(".img-tag-hover-container");
      var $saveButton = $(".img-tag-save");
      var $cancelButton = $(".img-tag-cancel");

      var $popupName = $("#popup-name");
      var $popupUrl = $("#popup-url");
      var $popupImageUrl = $("#popup-imageUrl");

      var name = $popupName.val();
      var url = $popupUrl.val();
      var imageUrl = $popupImageUrl.val();

      var x = ($tagCreator.offset().left + (widthOfSelection/2)) - img.parent().offset().left;
      var y = ($tagCreator.offset().top + (heightOfSelection/2)) - img.parent().offset().top;

      var len = savedData.length;
      var id = len==0?1:savedData[len-1].id + 1;
      var data = {
        id:id,  
        url:url,
        name:name,
        imageUrl:imageUrl,
        x:x,
        y:y
      }
      
      savedData.push(data);

      var $hoverObject = $("<div>", {"class": "img-tag-hover-object"});
      $hoverContainer.append($hoverObject);
      $href = $("<a href=\""+url+"\"><span class=\"glyphicon glyphicon-star\"></span></a>");
      $href.hover(function(){
        $(this).parent().find(".hover-pop-up").css({display:'inline-block'});
      },function(){
        $(this).parent().find(".hover-pop-up").css({display:'none'});
      });
      $hoverObject.append($href)
      $hoverObject.css({ top:y, left:x, display:"none"});
      $hoverPopUp = createHoverPopUP(name,url,imageUrl);
      $hoverObject.append($hoverPopUp);


      $tagCreator.css({display:'none'});
  }


  var createHoverPopUP = function(name, url, imageUrl){


    var obj = $('<div class="hover-pop-up panel panel-default" style="display:none;  min-width: 150px; min-height: 150px;">'
                  +    '<div class="panel-body text-center">'
                  +        '<h4>'+name+'</h4>'
                  +        '<img src="'+imageUrl+'" class="img-thumbnail" alt="Cinque Terre" width="200" height="200">'
                  +     '</div>'     
                  +'</div>');

    return obj;
  }

    return {
          intialisation: intialisation
        };
})();


$(document).ready(function(){
  console.log("Document Ready");console.log("Document Ready");
  imgTagging.intialisation("#example-image");
});
