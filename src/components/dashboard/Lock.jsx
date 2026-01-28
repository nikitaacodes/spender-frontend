import React from 'react'

const Lock = ({
  keyValue,
  password,
  onKeyChange,
  onPasswordChange,
  onUnlock,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-black/40 backdrop-blur-sm">
      <div className="w-[320px] rounded-2xl bg-inkblack p-6 text-center shadow-xl">
        <h2 className="pb-5 text-[28px] font-semibold">
          Access Dashboard
        </h2>

        <input
          type="text"
          placeholder="Key"
          value={keyValue}
          onChange={(e) => onKeyChange(e.target.value)}
          className="mb-3 w-full rounded-3xl bg-gray-800 px-4 py-2 outline-none"
        />

        <input
          type="password"
          placeholder="Passcode"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="mb-4 w-full rounded-3xl bg-gray-800 px-4 py-2 outline-none"
        />

        <button
          className="w-full rounded-3xl bg-amber-500 py-2 font-medium text-black hover:bg-amber-600"
          onClick={onUnlock}
        >
          Unlock
        </button>
      </div>

      <div className="text-center text-sm text-gray-300">
        <p>To access dashboard:</p>
        <p>• Hit <code>/start</code> to get your key</p>
        <p>• Hit <code>/pass your_passcode</code></p>
      </div>
    </div>
  );
};

export default Lock;
