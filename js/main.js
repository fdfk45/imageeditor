(function () {

"use strict";
    
    var canvas,
        ctx,
        photo,
        uploadBtn,
        normal,
        imageResize,
        currentImage,
        grayscale,
        sepia,
        invert,
        brightness,
        contrast,
        flipX,
        flipY,
        rotate90,
        rotate180,
        rotate270,
        rotate360,
        resizeDialog,
        saveDialog,
        crayonSizeDialog,
        saveNav,
        saveType,
        clearImage,
        clearImageYes,
        clearImageNo,
        imageName,
        imageType,
        saveNav,
        saveDialog,
        overlay,
        nameOfFile,
        typeOfFile, 
        edit,
        mouseDownDraw,
        clearDrawClose,
        filter,
        horizontal,
        vertical,
        currentDraw,
        switchNavToDraw = false,
        imgResizeBool = false,
        savPicture = false,
        filterImage = false,
        imageLoaded = false,
        crayonUse = false, 
        changeResize = false;
                    
    canvas = document.getElementById('canvas');
    
    ctx = canvas.getContext('2d');
    
    uploadBtn = document.getElementById('upload-btn');
    
    currentImage = document.getElementById('currentImage');
    
    overlay = document.getElementById('overlay');
    
    saveNav = document.getElementById('save');
            
    saveDialog = document.getElementById('save-dialog');
    
    imageName = document.getElementById("image-name");
            
    imageType = document.getElementById("image-type");
    
    saveType = document.getElementById('image-type');
            
    clearImageYes = document.getElementById('clear-image-yes');
            
    clearImageNo = document.getElementById('clear-image-no');
            
    clearImage = document.getElementById('clear-image-dialog');
                                    
    resizeDialog = document.getElementById('resize-dialog');
                                    
    crayonSizeDialog = document.getElementById('cs-dialog');
    
    clearDrawClose = document.getElementById('draw-close');
            
    edit = document.querySelectorAll('.edit');
             
function photoUpload() {
        
    var firstImage,
        files,
        file,
        loader,
        editClose,
        imageUrl,
        loader,
        len,
        i = 0;
        
    loader = document.getElementById('loader');
        
    editClose = document.getElementById('edit-close');
        
    photo = new Image();
    
uploadBtn.addEventListener('change', function(evt) {

        firstImage = evt.target.files[0];
    
        nameOfFile = evt.target.files[0].name;
                  
        typeOfFile = nameOfFile.split('.');
              
        imageName.value = nameOfFile;
              
        saveType.value = typeOfFile[1];
                
        canvas.title = firstImage.name;
                         
        file = new FileReader();
    
        imageUrl = file.readAsDataURL(firstImage);
        
        file.onprogress = function() {
            
           loader.style.display = 'block';    
            
        }
        
        file.onload = function() {
         
          loader.style.display = 'none';
            
           editClose.style.display = 'block'; 
            
           photo.src = file.result;
            
           currentImage.src  = photo.src;
            
           imageLoaded = true;
            
        }
    
}, false);
        
//Loading picture to the canvas
photo.onload = function() {
    
   var i = 0;    
    
   len = edit.length;
        
   ctx.clearRect(0,0,canvas.width,canvas.height);
            
   ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
        
    savPicture = true;
            
    for (; i < len; i++) {

        edit[i].removeAttribute('disabled');
                
    }
             
}

//Decline clearing the canvas
clearImageNo.addEventListener('click', function() {
                
    overlay.style.display = 'none';
            
    clearImage.style.display = 'none';                
                
},false);
        
//Clearing the canvas
 clearImageYes.addEventListener('click', function() {
     
       var i = 0;
     
       editClose.style.display = 'none'; 
                
       canvas.title = '';
                
       overlay.style.display = 'none';
            
       clearImage.style.display = 'none';
                
       resizeDialog.style.display = 'none';
                        
       saveDialog.style.display = 'none';
            
       crayonSizeDialog.style.display = 'none';
            
       len = edit.length;
                 
       currentImage.src = '';
            
       ctx.clearRect(0,0,canvas.width,canvas.height);
                
       savPicture = false;
     
       imageLoaded = false;
     
       filterImage = false;
     
       changeResize = false;
            
       for (; i < len; i++) {
                      
            edit[i].classList.remove('activeColor');
                 
            edit[i].setAttribute('disabled','disabled');  
         }  
                
        imageName.value = '';
                
        imageType.value = "png";
                
},false);
        
 saveNav.addEventListener('click', function() {
                
  if (savPicture !== true) {
                    
         return;                
    }
                
    overlay.style.display = 'block';
                
    saveDialog.style.display = 'block';  
                
},false);
        
editClose.addEventListener('click', function() {
                                    
  overlay.style.display = 'block';
            
  clearImage.style.display = 'block';
                                   
},false);

function imageEdit() {
        
        flipX = function() {
                 
        ctx.clearRect(0,0,canvas.width,photo.height);
        
        ctx.save();
                 
        ctx.translate(canvas.width/2,canvas.height/2);
                 
        ctx.scale(-1,1);
                 
        ctx.translate(-(canvas.width/2),-(canvas.height/2));
        
        if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
            if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            }
                        
        }   
                 
        ctx.restore();
        
    } 
             
    flipY = function() {
                 
       ctx.clearRect(0,0,canvas.width,photo.height);
        
       ctx.save();
                 
       ctx.translate(canvas.width/2,canvas.height/2);
                 
       ctx.scale(1,-1);
                 
       ctx.translate(-(canvas.width/2),-(canvas.height/2));
                                  
        if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
           if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            }
            
        }
                 
       ctx.restore();
        
    } 
             
    rotate90 = function() {
                 
        ctx.clearRect(0,0,canvas.width,photo.height);
        
        ctx.save();
                 
        ctx.translate(canvas.width/2,canvas.height/2);
                 
        ctx.rotate(1.57);
                 
        ctx.translate(-(canvas.width/2),-(canvas.height/2));
                                  
         if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
           if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            } 
            
        }
                 
        ctx.restore();
        
    } 
             
    rotate180 = function() {
                 
        ctx.clearRect(0,0,canvas.width,photo.height);
        
        ctx.save();
                 
        ctx.translate(canvas.width/2,canvas.height/2);
                 
        ctx.rotate(3.14);
                 
        ctx.translate(-(canvas.width/2),-(canvas.height/2));
                                  
         if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
           if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            }
            
        }
                 
        ctx.restore();
        
    }  
             
    rotate270 = function() {
        
        ctx.clearRect(0,0,canvas.width,photo.height);
        
        ctx.save();
                 
        ctx.translate(canvas.width/2,canvas.height/2);
                 
        ctx.rotate(4.71);
                 
        ctx.translate(-(canvas.width/2),-(canvas.height/2));
        
         if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
           if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            }
            
        }
                     
        ctx.restore();
        
     }  
             
    rotate360 = function() {
                 
        ctx.clearRect(0,0,canvas.width,photo.height);
        
        ctx.save();
                 
        ctx.translate(canvas.width/2,canvas.height/2);
                 
        ctx.rotate(6.28);
                 
        ctx.translate(-(canvas.width/2),-(canvas.height/2));
                                  
         if (filterImage === true) {
            
            if (changeResize === true) {
                
                ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(filter,0,0,canvas.width,canvas.height);
                
            }
            
        } else {
            
           if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,canvas.width,canvas.height);
                
            }
            
        }
                 
        ctx.restore();
        
     } 
            
    normal = function() {
                
        ctx.clearRect(0,0,canvas.width,canvas.height);
                
        ctx.drawImage(photo,0,0,canvas.width,canvas.height);
        
        filterImage = false;
                 
    }
            
    grayscale = function() {
                
        var pixels,
            data,
            len,
            i = 0,
            red,
            green,
            blue;
                
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
          if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
            }
                
        pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
                
        data = pixels.data;
                
        len = data.length;
                
        for (; i < len; i+=4) {
                    
            red = data[i];
                    
            green = data[i + 1];
                    
            blue = data[i + 2];
                    
            data[i] = data[i + 1] = data[i + 2] = (red + green + blue) / 3; 
                    
        }
                
           ctx.putImageData(pixels,0,0);
        
        filterImage = true;
        
        filter = new Image();
        
        filter.src = canvas.toDataURL();
        
        currentImage.src = canvas.toDataURL();
                
    }
            
    sepia = function() {
                
        var pixels,
            data,
            len,
            i = 0,
            red,
            green,
            blue;
                
        ctx.clearRect(0,0,canvas.width,canvas.height);
                
        if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
            }
                
        pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
                
        data = pixels.data;
                
        len = data.length;
                
        for (; i < len; i+=4) {
                    
            red = data[i];
                    
            green = data[i + 1];
                    
            blue = data[i + 2];
                    
            data[i] = (red * 0.283) + (green * 0.667) + (blue * 0.287);
            data[i + 1] = (red * 0.248) + (green * 0.585) + (blue * 0.275);
            data[i + 2] = (red * 0.373) + (green * 0.442) + (blue * 0.232);
                                        
        }
                
            ctx.putImageData(pixels,0,0);
        
        filterImage = true;
        
        filter = new Image();
        
        filter.src = canvas.toDataURL();
        
        currentImage.src = canvas.toDataURL();
                
    }
            
    invert = function() {
                
          var pixels,
              data,
              len,
              i = 0,
              red,
              green,
              blue;
                
        ctx.clearRect(0,0,canvas.width,canvas.height);
                
        if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
            }
                
        pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
                
        data = pixels.data;
                
        len = data.length;
                
        for(; i < len; i+=4) {
                    
            red = data[i] = 255 - data[i];
                    
            green = data[i + 1] = 255 - data[i + 1];
                    
            blue = data[i + 2] = 255 - data[i + 2];
                    
        }
                
        ctx.putImageData(pixels,0,0);
        
        filterImage = true;
        
        filter = new Image();
        
        filter.src = canvas.toDataURL();
        
        currentImage.src = canvas.toDataURL();
                
    }
            
   brightness = function() {
                
        var pixels,
            data,
            len,
            i = 0,
            red,
            green,
            blue;
                
        ctx.clearRect(0,0,canvas.width,canvas.height);
                
        if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
            }
                
        pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
                
        data = pixels.data;
                
        len = data.length;
                
        for (; i < len; i+=4) {
                    
            red = data[i] += 50;
                    
            green = data[i + 1] += 50;
                    
            blue = data[i + 2] += 50;
                                        
       }
                
        ctx.putImageData(pixels,0,0);
       
        filterImage = true;
        
        filter = new Image();
        
        filter.src = canvas.toDataURL();
       
        currentImage.src = canvas.toDataURL();
                
    } 
            
    contrast = function() {
                
        var pixels,
            data,
            len,
            i = 0,
            red,
            green,
            blue;
                
      ctx.clearRect(0,0,canvas.width,canvas.height);
                
      if (changeResize === true) {
                
                ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                
            } else {
            
            ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
            }
                
      pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
                
      data = pixels.data;
                
      len = data.length;
                
      for (; i < len; i+=4) {
                    
           red = data[i] -= 30;
                    
           green = data[i + 1] -= 30;
                    
           blue = data[i + 2] -= 30;
                                        
        }
                
         ctx.putImageData(pixels,0,0);
                
        filterImage = true;
        
        filter = new Image();
        
        filter.src = canvas.toDataURL();
        
        currentImage.src = canvas.toDataURL();
   }
        
    }
    
    imageEdit()
}
        
photoUpload()

//Handler for navigations
function navBar() {
        
        var editNav,
            drawNav,
            editContainer,
            drawContainer,
            uploadContain;
        
         uploadContain = document.getElementById("upload");
        
         editNav =  document.getElementById('edit');
                
         drawNav = document.getElementById('draw');
    
         editContainer = document.getElementById('edit-container');
            
         drawContainer = document.getElementById('draw-container');
        
        
         //Listening to a click on the edit nav
         editNav.addEventListener('click', function() {
             
             switchNavToDraw = false;
             
             var drawClass = document.querySelectorAll('.draw'),
                 
                 f;
             
             for(f = 0; f < drawClass.length; f++) {
                         
                drawClass[f].classList.remove('activeColor');
                         
               }
             
             mouseDownDraw = false;
             
             clearDrawClose.style.display = "none";
             
            if (imageLoaded === true) {
             
                imageName.value = nameOfFile;
              
                 saveType.value = typeOfFile[1];
                
             } 
                          
         if (currentImage.src === 'http://imageeditor.github.io/') {
                          
              ctx.clearRect(0,0,canvas.width,canvas.height);
             
               savPicture = false;
                        
         }
             
         else {
             
            ctx.drawImage(currentImage,0,0,currentImage.width,currentImage.height,0,0,canvas.width,canvas.height);
             
             savPicture = true;
          
          }
             
         canvas.style.cursor = 'default';
             
         uploadBtn.removeAttribute('disabled');
             
         uploadBtn.style.cursor = 'pointer';
            
         uploadContain.style.display = 'block';
             
         canvas.style.background = 'none';
            
         canvas.style.border = '2px solid #fff';
                
         document.querySelector('li:nth-child(1)').style.background = '#4AA0D5';
             
         document.querySelector('li:nth-child(2)').style.background = 'none';
                     
         editContainer.style.display = 'block';
                    
         drawContainer.style.display = 'none';
        
        },false);
        
        //Listening to a click on the draw nav
        drawNav.addEventListener('click', function() {
            
            var resizeDialog,
                saveDialog,
                crayonSizeDialog,
                clearDrawClose;
            
            switchNavToDraw = true;
            
            savPicture = true;
            
            imageName.value = '';
                  
            saveType.value = 'png';
                                    
            resizeDialog = document.getElementById('resize-dialog');
            
            clearDrawClose = document.getElementById('draw-close');
                        
            saveDialog = document.getElementById('save-dialog');
            
            crayonSizeDialog = document.getElementById('cs-dialog');
            
            canvas.title = '';
            
            resizeDialog.style.display = 'none';
                        
            saveDialog.style.display = 'none';
            
            crayonSizeDialog.style.display = 'none';
            
            if (crayonUse === true) {
              
                  photo = new Image();
            
                  photo.src = currentDraw;
            
                  photo.onload = function() {
                
                    ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,canvas.width,canvas.height);
                
                 }
                
            } else {
                
                  ctx.clearRect(0,0,canvas.width,canvas.height);
             
                  ctx.fillStyle = '#fff';
            
                  ctx.fillRect(0,0,canvas.width,canvas.height);
            
                  ctx.fill();
            
            }
                          
            uploadContain.style.display = 'none';
                        
            canvas.style.border = '2px solid #000';
            
            canvas.style.cursor = 'crosshair';
                        
            document.querySelector('li:nth-child(2)').style.background = '#4AA0D5';
            
            document.querySelector('li:nth-child(1)').style.background = 'none';
            
            drawContainer.style.display = 'block';
            
            clearDrawClose.style.display = 'none';
                        
            editContainer.style.display = 'none';
             
        },false);
        
       function subNav() {
            
              var editClass,
                  drawClass,
                  d,
                  e = d = 0,
                  c,
                  f;
        
                          
            editClass = document.querySelectorAll('.edit');
            
            drawClass = document.querySelectorAll('.draw');
            
              for(; e < editClass.length; e++) {
                  
                editClass[e].addEventListener("click", function() {
                                    
                     for(c = 0; c < editClass.length; c++) {
                         
                         editClass[c].classList.remove('activeColor');
                         
                     }
                    
                    this.classList.add('activeColor');
                    
                    
                },false);
                  
              }
            
               for(; d < drawClass.length; d++) {
                  
                drawClass[d].addEventListener("click", function() {
                                    
                     for(f = 0; f < drawClass.length; f++) {
                         
                         drawClass[f].classList.remove('activeColor');
                         
                     }
                    
                    this.classList.add('activeColor');
                    
                    
                },false);
                  
              }
                           
        }
        
        subNav();
        
        
        //Listenning to click on the save nav    
        function save() {
            
            var saveDialog,
                saveClose,
                imageName,
                saveType,
                saveBtn,
                cancelBtn,
                imageQuality,
                imageQualityVal,
                drawNav;
                                    
          drawNav = document.getElementById("draw");
                                            
          saveDialog = document.getElementById('save-dialog');
        
          saveClose = document.getElementById('save-close');
            
          imageName = document.getElementById('image-name');
            
          saveType = document.getElementById('image-type');
            
          imageQuality = document.getElementById('image-quality');
            
          saveBtn = document.getElementById('save-btn');
            
          cancelBtn = document.getElementById('cancel-btn');
            
          imageQualityVal = imageQuality.value;    
            
            
          imageQuality.addEventListener("change", function() {
              
              imageQualityVal = this.value;
              
          },false);
            
          imageName.addEventListener('change', function() {
              
              if (this.value === "") {
                  
                  return;
                  
              } else {
              
                 this.value = this.value + '.' + saveType.value;
                  
              }
                            
          },false);
            
        
           saveType.addEventListener('change', function() {
                              
              imageName.value = imageName.value.replace(/\.[a-z]+/,'.' + this.value); 
                           
           },false);
                        
                             
          saveBtn.addEventListener('click', function(evt) {
              
              evt.preventDefault();
              
              var thisBtn = this;
                            
              if (imageName.value !== "") {
                  
                 if (saveType.value === "jpg") {
                     
                     saveBtn.href = canvas.toDataURL('image/jpeg',imageQualityVal);
                          
                      saveBtn.download = imageName.value;
                          
                       saveDialog.style.display = 'none';
                        
                       overlay.style.display = 'none';
                                                    
                 } else {
                     
                     saveBtn.href = canvas.toDataURL('image/png',imageQualityVal);
                          
                      thisBtn.download = imageName.value;
                          
                       saveDialog.style.display = 'none';
                          
                       overlay.style.display = 'none';
                          
                       downloadSuccess.style.display = "block";
                         
                 } 
                                               
              } else {
                  
                  alert('Please enter a file name');
                  
              }
                          
          },false);
            
            cancelBtn.addEventListener('click', function() {
                
                saveDialog.style.display = 'none';
                
                overlay.style.display = 'none';
                
            },false);
            
            
         saveClose.addEventListener('click', function() {
       
            saveDialog.style.display = 'none';
             
            overlay.style.display = 'none';
       
        },false);
            
        }
        
        save();
           
    }
    
    navBar();
    
    function dialogs() {
        
        var save,
            resize,
            resizeDialog,
            saveDialog,
            crayonSizeBtn,
            crayonSizeDialog;
        
        save = document.getElementById('save');
                
        resize = document.getElementById('img-resize');
                
        saveDialog = document.getElementById('save-dialog');
        
        resizeDialog = document.getElementById('resize-dialog');
        
        crayonSizeBtn = document.getElementById('crayon-size');
        
        crayonSizeDialog = document.getElementById('cs-dialog');
        
        save.addEventListener('click', function() {
            
           resizeDialog.style.display = 'none';
                        
           crayonSizeDialog.style.display = 'none';
            
        },false);  
        
        resize.addEventListener('click', function() {
                        
           saveDialog.style.display = 'none';
            
           crayonSizeDialog.style.display = 'none';
            
        },false); 
        
        crayonSizeBtn.addEventListener('click', function() {
            
           resizeDialog.style.display = 'none';
                        
           saveDialog.style.display = 'none';
                        
        },false);
       
       imageResize = function() {
           
           var resizeDialog = document.getElementById('resize-dialog'),
               
               resizeClose = document.getElementById('resize-close'),
               
               resizeHorizontal = document.getElementById('resize-horizontal'),
           
               resizeVertical = document.getElementById('resize-vertical'),
               
               resizeOk = document.getElementById('resize-ok'),
               
               resizeCancel = document.getElementById('resize-cancel'),
               
               overlay = document.getElementById('overlay');
           
               resizeOk.addEventListener('click', function() {
                   
                   changeResize = true;
                   
                       horizontal = resizeHorizontal.value;
                       
                       vertical = resizeVertical.value;
                   
                   ctx.clearRect(0,0,canvas.width,canvas.height);
                   
                    if (filterImage === true) {
            
                         ctx.drawImage(filter,0,0,filter.width,filter.height,0,0,horizontal,vertical);
                
                      } else {
            
                         ctx.drawImage(photo,0,0,photo.width,photo.height,0,0,horizontal,vertical);
                          
                       }
                   
                   resizeDialog.style.display = 'none';
                   
                   overlay.style.display = 'none';
                   
                   
               },false);
           
               resizeCancel.addEventListener('click', function() {
                   
                    resizeDialog.style.display = 'none';
                   
                    overlay.style.display = 'none';
                   
               },false);
           
               resizeDialog.style.display = 'block';
           
               resizeClose.addEventListener('click', function() {

                   overlay.style.display = 'none';
                   
                   resizeDialog.style.display = 'none';
                   
               },false);
           
       }
        
    }
    
    dialogs();
    
    //Editing Images
    function editImage() {
        
    var edit,
        e = 0,
        elen;
        
     edit = document.querySelectorAll('.edit');
            
     elen = edit.length;

     while(e < elen) {
      
         edit[e].addEventListener('click', function() {
             
            var activeEdit = this.id;
                          
             switch(activeEdit) {
                     
                 case 'normal':
                      normal()
                      break;
                 
                 case 'grayscale':
                     grayscale();
                     break;
                     
                 case 'sepia':
                      sepia();
                     break;
                 
                 case 'invert':
                      invert();
                     break;
                     
                 case 'brightness':
                     brightness();
                     break; 
                 
                 case 'contrast':
                     contrast();
                     break;
                 
                 case 'img-resize':
                     overlay.style.display = 'block';
                     imageResize();
                     break;
                     
                 case 'flipX':
                      flipX();
                      break;
                        
                 case 'flipY':
                      flipY();
                      break;
                        
                 case 'rotate90':
                       rotate90();
                       break;
                        
                 case 'rotate180':
                       rotate180();
                       break;
                        
                 case 'rotate270':
                        rotate270();
                        break;
                        
                 case 'rotate360':
                        rotate360();
                        break;
             }
                          
         }, false);

         e++;
     }
        
    }
    
    editImage();
        
    function drawing() {
        
        var drawBtn,
            crayonDraw,
            erase,
            drawBtns,
            d = 0,
            dlen,
            draw,
            clearDrawClose,
            radius,
            color,
            crayonSize,
            crayonSizeOutput,
            crayonSizeDialog,
            fillCanvas,
            canvasColor,
            editNav,
            clearDrawDialog,
            clearDrawYes,
            clearDrawNo,
            activeColor,
            drawObject;
                
        clearDrawDialog = document.getElementById('clear-draw-dialog');
        
        clearDrawYes = document.getElementById('clear-draw-yes');
        
        clearDrawNo = document.getElementById('clear-draw-no');
        
        color = document.getElementById('color');
        
        crayonSize = document.getElementById('c-size');
        
        crayonSizeOutput = document.getElementById('output-size');
        
        clearDrawClose = document.getElementById('draw-close');
        
        clearDrawClose.addEventListener('click', function() {
        
            overlay.style.display = 'block';
             
            clearDrawDialog.style.display = 'block';
            
        },false);
        
         clearDrawYes.addEventListener('click', function() {
                
                overlay.style.display = 'none';
                
                clearDrawDialog.style.display = 'none';
                
                ctx.fillStyle = '#fff';
            
                ctx.fillRect(0,0,canvas.width,canvas.height);
            
                ctx.fill(); 
                
                clearDrawClose.style.display = "none";
             
                crayonUse = false;
                
            }, false);
        
        clearDrawNo.addEventListener('click', function() {
                
            overlay.style.display = 'none';
                
            clearDrawDialog.style.display = 'none';
                
        },false);
        
        radius = crayonSize.value;
        
        crayonSizeOutput.innerHTML = crayonSize.value;
        
        crayonSize.addEventListener('input', function() {
            
            crayonSizeOutput.innerHTML = this.value;
            
            radius = this.value;
            
        },false);
        
        drawObject = {};
                
        drawObject.colorVal = color.value;
        
        drawObject.drawBoolean = false;
        
        drawObject.colorChange = function() {
                
            color.addEventListener('change', function(evt) {
             
                drawObject.colorVal = evt.target.value;
                                                   
        },false);
            
        }
        
        drawObject.draw = function(x,y,r,c) {
            
                 ctx.save();
                            
                 ctx.strokeStyle = c;
            
                 ctx.lineWidth = r * 2;
            
                 ctx.lineTo(x,y);
            
                 ctx.stroke();
                
                 ctx.beginPath();
            
                 ctx.fillStyle = c;
            
                 ctx.arc(x,y,r,0,Math.PI * 2,false);
            
                 ctx.fill();
            
                 ctx.beginPath();
            
                 ctx.moveTo(x,y);
            
                 ctx.restore();
                
            }
        
        drawObject.result = function() {
                
                canvas.addEventListener('mousemove', function(evt) {
        
                var x = evt.clientX,
                
                y = evt.clientY,
                
                left = evt.target.offsetLeft,
                
                top = evt.target.offsetTop,
                
                resultX = x - left,
                
                resultY = y - top;
            
                if (drawObject.drawBoolean === true) {
            
                 drawObject.draw(resultX,resultY,radius,drawObject.colorVal);
                                
               }
            
             },false);
            
              canvas.addEventListener('mousedown', function(evt) {
                  
                if (mouseDownDraw === true) {
            
                  var x = evt.clientX,
                
                   y = evt.clientY,
                
                   left = evt.target.offsetLeft,
                
                   top = evt.target.offsetTop,
                
                   resultX = x - left,
                
                   resultY = y - top;
            
                   ctx.beginPath();
            
                   drawObject.draw(resultX,resultY,radius,drawObject.colorVal);
                
                   drawObject.drawBoolean = true;
                      
                   clearDrawClose.style.display = 'block';
                    
                    crayonUse = true;
                                          
                  }
                
            
              }, false);
            
                  canvas.addEventListener('mouseup', function() {
            
                     drawObject.drawBoolean = false;
                      
                      if (switchNavToDraw === true) {
                          
                          currentDraw = canvas.toDataURL();
                                                    
                      }
                      
                     
            
               },false);            
                
            }
        
        crayonSizeDialog = function() {
            
            var crayonSizeDialog = document.getElementById('cs-dialog'),
                
                crayonSizeClose = document.getElementById('cs-close'),
                
                overlay = document.getElementById('overlay');
            
                overlay.style.display = 'block';
            
                crayonSizeDialog.style.display = 'block';
              
                crayonSizeClose.addEventListener('click', function() {
                
                crayonSizeDialog.style.display = 'none';
                   
                overlay.style.display = 'none';
                
            },false);
            
        }
        
        fillCanvas =  function() {
            
           canvasColor = true;
            
           activeColor = ctx.fillStyle = color.value;
            
           ctx.fillRect(0,0,canvas.width,canvas.height);
            
           ctx.fill();
             
        }
                        
        drawBtns = document.querySelectorAll('.draw');
        
        editNav = document.getElementById('edit');
           
        dlen = drawBtns.length;
        
        while(d < dlen) {
            
            drawBtns[d].addEventListener('click', function() {
                
                var activeDrawBtn = this.id;
                                
                switch(activeDrawBtn) {
                        
                    case 'crayon':
                        mouseDownDraw = true;
                        drawObject.colorVal = color.value;
                        drawObject.result();
                        break;
                        
                    case 'color':
                        drawObject.colorChange();
                        break;
                        
                    case 'eraser':
                        drawObject.colorVal = '#fff';
                        if(canvasColor === true) {
                              drawObject.colorVal = activeColor;
                        }
                        drawObject.result();
                        break;
                    
                    case 'crayon-size':
                        crayonSizeDialog();
                        break;
                    
                    case 'fill-canvas':
                        fillCanvas();
                        break;
                }
                             
        },false);
              
            d++
            
        }
    }
    
    drawing();
    
})();