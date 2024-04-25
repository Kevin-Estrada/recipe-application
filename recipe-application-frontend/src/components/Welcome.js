// function Welcome() {
//   return <h1>Welcome, Kevin</h1>;
// }

// export default Welcome;

const Welcome = (props) => {
  return <h1>Welcome, {props.name}</h1>;
};

export default Welcome;
