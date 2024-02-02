const LoadingButton = () => {
  return (
    <div className="h-[800px] flex justify-center items-center">
      <button className="btn">
        <span className="loading loading-spinner"></span>
        ....Loading
      </button>
    </div>
  );
};

export default LoadingButton;
