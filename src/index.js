/*
Guide:
https://hackernoon.com/building-a-react-component-library-part-2-46fd4f77bb5c

Standards:
https://github.com/eventbrite/javascript/tree/master/react
*/

//react assets
import NewsLetterSignupForm from './components/NewsLetterSignupForm';
import TwitterTimeline from './components/TwitterTimeline';
import MainFooter from './components/MainFooter';
import ScrollToTopRoute from './components/ScrollToTopRoute';
import Spacer from './components/Spacer';
import PrimaryNavBar from './components/PrimaryNavBar';
import ImageHeaderBanner from './components/ImageHeaderBanner';
import ContactForm from './components/ContactForm';
import DataContainer from './components/DataContainer';
import EnhancedTextField from './components/EnhancedTextField';
import DataContainer from './components/DataContainer';

//server assets
import mailProvider from './serverAssets/providers/mailProvider';


module.exports = {
  //server assets
  NewsLetterSignupForm,
  TwitterTimeline,
  MainFooter,
  ScrollToTopRoute,
  Spacer,
  PrimaryNavBar,
  ImageHeaderBanner,
  ContactForm,
  DataContainer,
  EnhancedTextField,
  DataContainer,

  //react assets
  mailProvider
}