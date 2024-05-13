export default function Loading() {
  const arr = new Array(3).fill(7);
  return (
    <>
      {arr?.map((item, index) => {
        <div
          className="my-6  min-h-[100] md:w-[80%] flex flex-col md:flex-row mx-auto border boreder-1 bg-white backdrop-blur-lg shadow-md rounded-xl space-y-2 bg-gradient-to-r from-white via-white to-cyan-50"
          key={index + item}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>;
      })}
    </>
  );
}
