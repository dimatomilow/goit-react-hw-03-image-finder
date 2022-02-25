import {Component} from 'react';

import Searchbar from "./Components/Searchbar/Searchbar";
import Container from "./Components/styled/Container";
import GlobalStyle from "./Components/styled/GlobalStyle";
import fetchImages from './servise/pixabayAPI';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {
  state = {
    images:[],
    imageName: "",
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
  };


  componentDidUpdate(_, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevState.imageName !== this.state.imageName || prevPage !== nextPage) {
      this.setState({ status: 'pending',images: [] });
      setTimeout(() => {
        this.finderImages();
      }, 500);

    }

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
}



  finderImages = async () => {
    const { imageName, page } = this.state;

    try {
      const data = await fetchImages(imageName, page);
      console.log(data);

      if (data.length === 0) {
      toast.error('Sorry, there are no images matching your search query. Please try again.')
        this.setState({ status: 'rejected' });
        return;
      }

      this.setState({
        images: [...data],
        status: 'resolved',
      });

    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };



    incrementNextPage = () => {
        this.setState({ page:this.state.page + 1})
  }
  incrementPrevPage = () => {
    const{page}=this.state
    this.setState({ page:page > 1?page - 1: 1})
  }



  submitForm = imageName => {
  this.setState({imageName})

      }

   toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ modalLargeImage: largeImageURL, modalLargeAlt: tags });
  };


  render() {
const { images,status, showModal,modalLargeImage,modalLargeAlt} = this.state


    return (
      <>

        <GlobalStyle />

        <Container>

          <Searchbar onSubmit={this.submitForm} />
          {status === 'idle' ? (<h1>Введите название картинки</h1>) : null}
          {status ==='pending'?(<Loader/>):null}
{status === 'rejected' ? (<ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
            />

          ) : null}
{images.length >0&&
            (<>
            <ImageGallery imageName={images} onClick={ this.handleOpenModal}/>
          <Button click={this.incrementPrevPage} text={"prev page"}/>
          <Button click={this.incrementNextPage} text={"next page"}/>
            </>)}
          {showModal && <Modal src={modalLargeImage} alt={modalLargeAlt} onClose={this.toggleModal} />}

        </Container>

  </>
    );
  }
}


export default App;
