const HOST = 'https://32kbkb2jhg524.execute-api.us-east-1.amazonaws.com/dev';

function App() {
  const [originText, setOriginText] = useState('');
  const [translated, setTranslated] = useState('');

  const tryTranslate = async (text: string) => {
    if (!text) {
      console.warn('text is empty');
      return;
    }

    const data = { text };
    const response = await fetch(`${HOST}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as { braille: string };
    console.log(result);

    if (result.braille) {
      setOriginText(text);
      setTranslated(result.braille);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-[640px] flex-col gap-8">
        <h1 className="text-center text-6xl font-bold">⠏⠗⠊⠝⠞⠋⠕⠗⠎⠊⠛⠓⠞</h1>

        {translated ? (
          <TryPrint originText={originText} translated={translated} />
        ) : (
          <EnterText tryTranslate={tryTranslate} />
        )}
      </div>
    </div>
  );
}

const EnterText = ({
  tryTranslate,
}: {
  tryTranslate: (text: string) => void;
}) => {
  const [text, setText] = useState('');

  return (
    <div className="flex gap-2 p-2">
      <input
        className="outline-none! flex-grow border-b-2 border-black"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="px-2 py-1" onClick={() => tryTranslate(text)}>
        ✏️
      </button>
    </div>
  );
};

const TryPrint = ({
  originText,
  translated,
}: {
  originText: string;
  translated: string;
}) => {
  const print = async () => {
    const data = { text: translated };
    const response = await fetch(`${HOST}/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm">origin</p>
          <p className="text-2xl">{originText}</p>
        </div>

        <div>
          <p className="text-sm">translated</p>
          <p className="text-2xl">{translated}</p>
        </div>
      </div>

      <button className="px-2 py-1" onClick={print}>
        👉 🖨️
      </button>
    </>
  );
};

export default App;
