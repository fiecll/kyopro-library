#include <bits/stdc++.h>
#include <atcoder/all>
using namespace std;
using namespace atcoder;
#define rep(i, n) for (int i = 0; i < (int)(n); i++)
#define all(v) v.begin(), v.end()
using ll = long long;
using Graph = vector<vector<int>>;
using P = pair<int,int>;
template<typename T,typename U>inline bool chmax(T&a,U b)
{if(a<b){a=b;return 1;}return 0;}
template<typename T,typename U>inline bool chmin(T&a,U b)
{if(a>b){a=b;return 1;}return 0;}

/-------------------------------
// ３次元累積和の前処理
// a : 対象となる３次元配列（サイズ: X×Y×Z）
// S : 累積和を記録する３次元配列（サイズ: (X+1)×(Y+1)×(Z+1)）
// 各 S[x+1][y+1][z+1] には、a[0..x][0..y][0..z] の和が格納されます
//-------------------------------
void pre_process_3d(const vector<vector<vector<int>>>& a,
                      vector<vector<vector<int>>>& S) {
    int X = a.size();
    int Y = a[0].size();
    int Z = a[0][0].size();
    // サイズを1増やして累積和用配列 S を初期化
    S.assign(X + 1, vector<vector<int>>(Y + 1, vector<int>(Z + 1, 0)));
    
    // S の各要素を計算（インデックスは 1 から始める）
    for (int x = 0; x < X; x++) {
        for (int y = 0; y < Y; y++) {
            for (int z = 0; z < Z; z++) {
                S[x + 1][y + 1][z + 1] =
                      a[x][y][z]
                    + S[x][y + 1][z + 1] + S[x + 1][y][z + 1] + S[x + 1][y + 1][z]
                    - S[x][y][z + 1] - S[x][y + 1][z] - S[x + 1][y][z]
                    + S[x][y][z];
            }
        }
    }
}

//-------------------------------
// ３次元累積和クエリ
// 区間 [x1, x2) × [y1, y2) × [z1, z2) の和を返します
// ※S は前処理済みの累積和配列（サイズ: (X+1)×(Y+1)×(Z+1)）
//-------------------------------
int query_3d(int x1, int x2, int y1, int y2, int z1, int z2,
             const vector<vector<vector<int>>>& S) {
    return S[x2][y2][z2]
         - S[x1][y2][z2] - S[x2][y1][z2] - S[x2][y2][z1]
         + S[x1][y1][z2] + S[x1][y2][z1] + S[x2][y1][z1]
         - S[x1][y1][z1];
}

//-------------------------------
// 使用例
// 入力例:
// 　最初に X, Y, Z の値（３次元配列のサイズ）を入力し、その後配列 a の全要素
// 　最後にクエリ区間 [x1, x2) [y1, y2) [z1, z2) の各境界値を入力します
//-------------------------------
int main() {
    int X, Y, Z;
    cin >> X >> Y >> Z;
    // ３次元配列 a を読み込み (サイズ: X×Y×Z)
    vector<vector<vector<int>>> a(X, vector<vector<int>>(Y, vector<int>(Z)));
    for (int x = 0; x < X; x++) {
        for (int y = 0; y < Y; y++) {
            for (int z = 0; z < Z; z++) {
                cin >> a[x][y][z];
            }
        }
    }
    
    // 累積和配列 S の前処理
    vector<vector<vector<int>>> S;
    pre_process_3d(a, S);
    
    // クエリ入力例
    int x1, x2, y1, y2, z1, z2;
    cin >> x1 >> x2 >> y1 >> y2 >> z1 >> z2;
    // 例：区間 [x1, x2) × [y1, y2) × [z1, z2) の和を求める
    cout << query_3d(x1, x2, y1, y2, z1, z2, S) << endl;
    
    return 0;
}