import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "../Description/Description.jsx";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Home from "../HomePage/Home.jsx";
import Blog from "../HomePage/Body/Blog.jsx";
import BlogPage from "../HomePage/Body/BlogPage.jsx";
import EventPage from "../HomePage/Body/EventPage.jsx";
import ProtectedRoute from "../Description/ProtectedRoute.jsx";
import { useEffect, useState } from "react";
import Axios from "axios";

export default function FrontendRoutes() {
  const [renderNow, setRenderNow] = useState(false);
  const [renderNowBlogs, setRenderNowBlogs] = useState(false);
  const [renderNowEvents, setRenderNowEvents] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [Events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Description />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Home/Blog/:id" element={<Blog />} />
          <Route
            path="/Home"
            element={
              <Home
                renderNow={renderNow}
                setRenderNow={setRenderNow}
                blogs={blogs}
                setBlogs={setBlogs}
                Events={Events}
                setEvents={setEvents}
                userEvents={userEvents}
                setUserEvents={setUserEvents}
              />
            }
          />
          <Route
            path="/Home/BlogPage"
            element={
              <BlogPage
                renderNowBlogs={renderNowBlogs}
                setRenderNowBlogs={setRenderNowBlogs}
                blogs={blogs}
                setBlogs={setBlogs}
              />
            }
          />
          <Route
            path="/Home/EventPage"
            element={
              <EventPage
                renderNowEvents={renderNowEvents}
                setRenderNowEvents={setRenderNowEvents}
                Events={Events}
                setEvents={setEvents}
                userEvents={userEvents}
                setUserEvents={setUserEvents}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
