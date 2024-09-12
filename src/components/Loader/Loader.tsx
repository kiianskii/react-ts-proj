import { Comment } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader-box">
      {" "}
      <Comment
        visible={true}
        height="160"
        width="160"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#323232d6"
      />
    </div>
  );
}

export default Loader;
