import {
  authAction,
  loginAction,
  logoutAction,
  registerAction,
  resetPasswordAction,
} from "../actions/AuthActions";
import reducer, { initialAuthState } from "./AuthReducer";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userMock = {
  email: "email@email.email",
  name: "User Name",
};

const userLoginMock = {
  email: "email@email.email",
  password: "password",
};

const userSignUpMock = userMock && userLoginMock;

const userTokensMock = {
  user: userMock,
  accessToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  refreshToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

describe("Authentication reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Initialization", () => {
    it("should return the initial state", () => {
      expect(reducer(undefined, { type: "" })).toEqual(initialAuthState);
    });
  });

  describe("Authentication", () => {
    it("should work correctly", () => {
      const store = mockStore(initialAuthState);

      fetchMock.getOnce("*", () => {
        return { user: userMock };
      });

      store.dispatch(authAction()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(authAction.pending.type);
        expect(actions[1].type).toBe(authAction.fulfilled.type);
        expect(actions[1].payload).toEqual(userMock);
      });
    });

    it("should see request rejected", () => {
      expect(
        reducer(undefined, { type: authAction.rejected.type }).request.isError
      ).toEqual(true);
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: authAction.pending.type }).request.pending
      ).toEqual(true);
    });
  });

  describe("Registration", () => {
    it("should work correctly", () => {
      const store = mockStore(initialAuthState);

      fetchMock.postOnce("*", () => {
        return { user: userMock };
      });

      store.dispatch(registerAction(userSignUpMock)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(registerAction.pending.type);
        expect(actions[1].type).toBe(registerAction.fulfilled.type);
        expect(actions[1].payload).toEqual(userMock);
      });
    });

    it("should see request rejected", () => {
      expect(
        reducer(undefined, { type: registerAction.rejected.type }).request
          .isError
      ).toEqual(true);
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: registerAction.pending.type }).request
          .pending
      ).toEqual(true);
    });
  });

  describe("Authorization", () => {
    it("should work correctly", () => {
      const store = mockStore(initialAuthState);

      fetchMock.postOnce("*", () => {
        return userTokensMock;
      });

      store.dispatch(loginAction(userLoginMock)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(loginAction.pending.type);
        expect(actions[1].type).toBe(loginAction.fulfilled.type);
        expect(actions[1].payload).toEqual(userMock);
      });
    });

    it("should see request rejected", () => {
      expect(
        reducer(undefined, { type: loginAction.rejected.type }).request.isError
      ).toEqual(true);
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: loginAction.pending.type }).request.pending
      ).toEqual(true);
    });
  });

  describe("Password reset", () => {
    it("should work correctly", () => {
      const store = mockStore(initialAuthState);

      fetchMock.postOnce("*", () => {
        return { success: true };
      });

      return store.dispatch(resetPasswordAction()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(resetPasswordAction.pending.type);
        expect(actions[1].type).toBe(resetPasswordAction.fulfilled.type);
        expect(actions[1].payload).toEqual(true);
      });
    });

    it("should see request rejected", () => {
      expect(
        reducer(undefined, { type: resetPasswordAction.rejected.type }).request
          .isError
      ).toEqual(true);
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: resetPasswordAction.pending.type }).request
          .pending
      ).toEqual(true);
    });
  });

  describe("Logout", () => {
    it("should work correctly", async () => {
      const store = mockStore({ ...initialAuthState, user: userMock });

      fetchMock.postOnce("*", () => {
        return { success: true };
      });

      await store.dispatch(logoutAction()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(logoutAction.pending.type);
        expect(actions[1].type).toBe(logoutAction.fulfilled.type);
        expect(actions[1].payload).toEqual(true);
      });
    });

    it("should see request rejected", () => {
      expect(
        reducer(undefined, { type: logoutAction.rejected.type }).request.isError
      ).toEqual(true);
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: logoutAction.pending.type }).request.pending
      ).toEqual(true);
    });
  });
});
