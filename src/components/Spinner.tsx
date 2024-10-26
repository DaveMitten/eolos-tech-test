const Spinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "60%",
          borderBottom: "1px solid white",
          borderTopColor: "transparent",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
