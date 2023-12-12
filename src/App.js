const App = ({
  title = "Merkle Tree Airdrop Campaign Client",
  description = "Default description text",
}) => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl">{title}</h2>
    <p className="text-blue-600">{description}</p>
  </div>
);

export default App;
