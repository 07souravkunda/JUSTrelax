import React from "react";
import "./SearchBar.css";
import { withRouter } from "react-router-dom";
const searchBar = (props) => {
  return (
    // <div id="cover">
    //   <form method="get" action="">
    //     <div class="tb">
    //       <div class="td">
    //         <input type="text" placeholder="Search" required />
    //       </div>
    //       <div class="td" id="s-cover">
    //         <button type="submit">
    //           <div id="s-circle"></div>
    //           <span></span>
    //         </button>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    <form action="/search.html" className="search-wrapper cf">
      <input type="text" id="input" placeholder="Search here..." required="" />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          const input = document.getElementById("input");
          console.log(input.value);
          if (input.value && input.value !== " ")
            props.history.push(`/search/${input.value}`);
          props.submitHandler(input.value);
          input.value = "";
        }}
      >
        Search
      </button>
    </form>
  );
};

export default withRouter(searchBar);
