const ProgressBar = ({ completed, total }) => {
    const progress = total > 0 ? (completed / total) * 100 : 0;
  
    return (
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
        <p>
          {completed}/{total} tasks completed
        </p>
      </div>
    );
  };
  
  export default ProgressBar;
  