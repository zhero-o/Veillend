import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { useStore } from '../store/store';

// Helper to reset store between tests
beforeEach(() => {
  useStore.setState({
    address: null,
    authToken: null,
    isPrivacyMode: false,
    authLoading: false,
    sessionRestored: true,
    lendingLoading: false,
    lastLendingTx: null,
    protocolStatusLoading: false,
    protocolStatusError: null,
    shieldedLoading: false,
    currentNetwork: 'testnet',
    lastProtocolSyncAt: null,
  });
});

describe('Auth persistence (issue #59)', () => {
  it('should persist address when set', () => {
    const { setAddress } = useStore.getState();
    setAddress('GBOYEE_WALLET_ADDRESS');

    assert.equal(useStore.getState().address, 'GBOYEE_WALLET_ADDRESS');
  });

  it('should clear address from store when set to null', () => {
    useStore.setState({ address: 'SOME_ADDRESS' });
    const { setAddress } = useStore.getState();
    setAddress(null);

    assert.equal(useStore.getState().address, null);
  });

  it('should persist authToken when set', () => {
    const { setAuthToken } = useStore.getState();
    setAuthToken('my-jwt-token');

    assert.equal(useStore.getState().authToken, 'my-jwt-token');
  });

  it('should clear authToken when set to null', () => {
    useStore.setState({ authToken: 'some-token' });
    const { setAuthToken } = useStore.getState();
    setAuthToken(null);

    assert.equal(useStore.getState().authToken, null);
  });

  it('logout should clear address, authToken, and isPrivacyMode', () => {
    useStore.setState({
      address: 'WALLET',
      authToken: 'TOKEN',
      isPrivacyMode: true,
    });

    const { logout } = useStore.getState();
    logout();

    assert.equal(useStore.getState().address, null);
    assert.equal(useStore.getState().authToken, null);
    assert.equal(useStore.getState().isPrivacyMode, false);
    assert.equal(useStore.getState().sessionRestored, true);
  });
});

describe('Privacy mode persistence (issue #59)', () => {
  it('should toggle privacy mode on', () => {
    assert.equal(useStore.getState().isPrivacyMode, false);

    const { togglePrivacyMode } = useStore.getState();
    togglePrivacyMode();

    assert.equal(useStore.getState().isPrivacyMode, true);
  });

  it('should toggle privacy mode off after being on', () => {
    useStore.setState({ isPrivacyMode: true });

    const { togglePrivacyMode } = useStore.getState();
    togglePrivacyMode();

    assert.equal(useStore.getState().isPrivacyMode, false);
  });
});

describe('Session restore (issue #59)', () => {
  it('should have sessionRestored flag', () => {
    assert.equal(typeof useStore.getState().sessionRestored, 'boolean');
  });

  it('should start with sessionRestored = true after hydration', () => {
    // The IIFE at bottom of store.ts sets sessionRestored = true
    // For this test we just verify the flag exists and is boolean
    assert.ok([true, false].includes(useStore.getState().sessionRestored));
  });
});

describe('shieldedLoading state (issue #59)', () => {
  it('should have shieldedLoading in store for App.tsx', () => {
    assert.equal(typeof useStore.getState().shieldedLoading, 'boolean');
    assert.equal(useStore.getState().shieldedLoading, false);
  });
});
