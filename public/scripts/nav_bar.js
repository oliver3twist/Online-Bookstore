function dynamicNavbar(){
	nav=document.getElementByClass("navbar navbar-expand-md bg-dark navbar-dark");
	nav.innerHTML={"
		
  <nav class=\"navbar navbar-expand-md bg-dark navbar-dark\">
      
  
 <a class=\"navbar-brand\" href=\"home.html\">Home</a>

  
  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">
    <span class=\"navbar-toggler-icon\"></span>
  </button>

  <div class=\"collapse navbar-collapse justify-content-between\" id=\"collapsibleNavbar\">
      
     
    <ul class=\"navbar-nav\" id=\"barLeft\">
      <li class=\"nav-item mx-2\">
          <a class=\"nav-link\" id=\"barLink-home\">Home</a>
      </li>
      <li class=\"nav-item mx-2\">
        <a class=\"nav-link\" id=\"barLink\" href=\"./booklist.html\">Books</a>
      </li>
      <li class=\"nav-item mx-2\">
        <a class=\"nav-link\" id=\"barLink\" href=\"./promotions.html\">Promotions</a>
      </li>
      
    </ul>
    
    
      <ul class=\"navbar-nav\" id=\"barRight\"> 
       <li class=\"nav-item mx-2\">
        <a class=\"nav-link\" id=\"barLink-profile\"></a>
      </li> 
          
    <li class=\"nav-item mx-2\">
        <a id=\"cart\" class=\"nav-link px-0 py-0\" href=\"./cart.html\">
            
        </a>
    </li> 
     
	
	
         
        
    <form class=\"form-inline mx-2\" action=\"/action_page.php\">
        <input class=\"form-control mr-sm-2\" type=\"text\" placeholder=\"Search Books\">
        <button class=\"btn btn-success\" id=\"search\" type=\"submit\">Search</button>
    </form>
    
    <li class=\"nav-item mx-2\">
        <a class=\"nav-link\" id=\"barLink-logout\" onclick=\"logout()\" href=\"#\">Log Out</a>
    </li>    
    </ul>
      
  </div> 
</nav>

	
	};
}//dynamicnavbar