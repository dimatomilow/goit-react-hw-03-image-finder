import {Component} from 'react';



class Searchbar extends Component {
  state = {imageName:''}

handleSubmit = e => {
  e.preventDefault();
  if (this.state.imageName.trim() === '') {
    alert(' Введите поисковый запрос!');

    return ;
  }

  this.props.onSubmit(this.state.imageName);
  this.setState({ imageName: "" });

  };

  handleChange = e => {
    this.setState({
      imageName:e.currentTarget.value.toLowerCase()

    })
  };

  render() {
    return (
      <header>
  <form  onSubmit={this.handleSubmit}>

    <input
      type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.imageName}
          />
          <button type="submit" >
      <span >Search</span>
    </button>
  </form>
</header>
    );
  }
}

export default Searchbar