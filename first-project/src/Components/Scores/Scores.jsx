import "./style.css";

export default function Scores({ count }) {
  return (
    <>
      <button className="rounded-button">
        Current
        <br />
        {count}
      </button>
    </>
  );
}
