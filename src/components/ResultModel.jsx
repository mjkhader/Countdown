import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom'
const ResultModel = forwardRef(function ResultModel(
  { targetTime ,remainingTime, onReset},
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0
  const formattedRemainingTime = (remainingTime/ 1000).toFixed(2)
  const score = Math.round((1 - remainingTime / (targetTime *1000) ) * 100)

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" >
      {userLost && <h2>Your lost</h2>}
      {!userLost && <h2>your score:{score}</h2>}
      <p>
        the target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime}seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModel;
