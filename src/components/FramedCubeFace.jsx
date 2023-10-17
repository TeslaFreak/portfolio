export const FramedCubeFace = ({ children, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex place-content-center items-end h-full w-full"
    >
      <div className=" [&>*]:border-black [&>*]:border-b-0 [&>*]:rounded-t-3xl [&>*]:border-solid [&>*]:border-[18px] [&>*]:shadow-lg [&>*]:shadow-black w-[75%] h-[73%]">
        {children}
      </div>
    </div>
  );
};
