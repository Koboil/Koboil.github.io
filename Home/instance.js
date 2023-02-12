function create_fen(name,width,height,icon) {
    var container = document.querySelector('.container');
    
    var header = document.createElement("div"); 
    header.className = "content-header  " + name;  
    header.width = toString(parseInt(width+32));
    header.height = "15px";

    var info = document.createElement("div");
    info.className = "info"; 


    var title = document.createElement("small");
    title.innerHTML = name;

    var icone = document.createElement("img");
    icone.src = "/public/Icons/"+icon+"/"+icon+"-16.png";

    info.appendChild(icone);
    info.appendChild(title);
    header.appendChild(info);

    var content = document.createElement("div");
    content.className = "content "; 
    content.width = width; 
    content.height = height;

    container.appendChild(header);
    container.appendChild(content);

    window.activeIstance_header = header;
    window.activeIstance_content = content;

    header.onclick = function()
    {
        
        header.classList.add("tete");
        content.classList.add("window");

        const childs = container.children ; 
        for (var i = 0 ; i < childs.length ; i++)
        {
            if (
                childs[i] !== window.activeIstance_header && 
                childs[i] !== window.activeIstance_content
                )
            {
                childs[i].classList.remove("tete");
                childs[i].classList.remove("window");
            }
        }
        var script = document.getElementById("myScript");       
        script.src = "drag-and-drop.js";
    };

            


}