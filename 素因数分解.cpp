//@素因数分解
//@それぞれの素因数をいくつ持つかをmapで返す

#include <cmath>
#include <map>
using namespace std;

typedef long long ll;

map<ll, ll> Prime_factor(ll n) {
    map<ll, ll> mp;
    ll sq = sqrt(n);
    for (ll i = 2; i <= sq; i++) {
        while (n % i == 0) {
            mp[i]++;
            n /= i;
        }
    }
    if (n != 1) {
        mp[n]++;
    }
    return mp;
}
