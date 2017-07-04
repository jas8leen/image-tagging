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
    var $searchInput = $(".img-tag-search");
    var $hoverCreator = $(".img-tag-hover-creator");
    var $hoverContainer = $(".img-tag-hover-container");
    var $saveButton = $(".img-tag-save");
    var $cancelButton = $(".img-tag-cancel");



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
      $searchInput.val("");
      var posX = $(this).parent().offset().left;
      var posY = $(this).parent().offset().top;
      var mouseX = e.pageX - (posX + (widthOfSelection/2));// width of the box is 100
      var mouseY = e.pageY - (posY + (heightOfSelection/2));// height of the box is 100
      $tagCreatorContainer.css({ top:mouseY, left:mouseX, display:"block"});
    });


    // Bind the click function on the created HTML
    $searchInput.unbind("keyup");
    $searchInput.on("keyup", function(e){
      if(e.keyCode == 13){
          var val = $searchInput.val();
          if(val){
            saveTag($searchInput, $tagCreatorContainer, img, $hoverContainer);
          }
          //$("#res").remove(); What is this?
          $tagCreatorContainer.css({display:'none'});
        }
      });

  }




  var saveTag = function(search, tagCreator, img, hoverContainer){  

      var url =  search.val();
      var x = (tagCreator.offset().left + (widthOfSelection/2)) - img.parent().offset().left;
      var y = (tagCreator.offset().top + (heightOfSelection/2)) - img.parent().offset().top;

      var len = savedData.length;
      var id = len==0?1:savedData[len-1].id + 1;
      var data = {
        id:id,  
        url:url,
        x:x,
        y:y
      }
      
      savedData.push(data);
      
      var $hoverObject = $("<div>", {"class": "img-tag-hover-object"});
      $hoverObject.append("<a href=\""+url+"\"><span class=\"glyphicon glyphicon-star\"></span></a>")
      $hoverObject.css({ top:y, left:x, display:"none"});
      hoverContainer.append($hoverObject);

      tagCreator.css({display:'none'});
  }

    return {
          intialisation: intialisation
        };
})();


$(document).ready(function(){
  console.log("Document Ready");
  imgTagging.intialisation("#example-image");
});
