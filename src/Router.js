import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import TestDatAlignAPI from "./pages/TestDatAlignAPI";
import TestExpressAPI from "./pages/TestExpressAPI";
import PingPong from "./pages/PingPong";
import Todos from "./pages/Todos";
import TodoForm from "./components/TodoForm";
import Todo from "./pages/Todo";

const queryClient = new QueryClient();

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">React Query POC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/test-api">
                  <Nav.Link>Test DatAlign API</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/test-express">
                  <Nav.Link>Test Express API</Nav.Link>
                </LinkContainer>{" "}
                <LinkContainer to="/pong">
                  <Nav.Link>Ping Pong</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/todos">
                  <Nav.Link>Todos</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/test-api">
              <TestDatAlignAPI />
            </Route>
            <Route path="/test-express">
              <TestExpressAPI />
            </Route>
            <Route path="/pong">
              <PingPong />
            </Route>
            <Route path="/todos">
              <Todos />
            </Route>
            <Route path="/add-todo">
              <TodoForm onSubmit={() => console.log("Boom!")} />
            </Route>
            <Route path={"/todo/:id"} component={Todo} />
          </Switch>
        </Container>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Router;
