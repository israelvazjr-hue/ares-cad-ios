/* esm.sh - three-mesh-bvh@0.7.3 */
var Vi=Object.defineProperty;var ki=(i,e)=>{for(var t in e)Vi(i,t,{get:e[t],enumerable:!0})};import{BufferAttribute as No,Box3 as Ai,FrontSide as yi}from"./three.module.js";var Xt=0,vn=1,Tn=2,Oi=0,Hi=1,Me=2;var wn=Math.pow(2,-24),Gt=Symbol("SKIP_GENERATION");import{BufferAttribute as qi}from"./three.module.js";function Ee(i){return i.index?i.index.count:i.attributes.position.count}function j(i){return Ee(i)/3}function De(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Bn(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,o=De(t,n);i.setIndex(new qi(o,1));for(let a=0;a<t;a++)o[a]=a}}function Fe(i){let e=j(i),t=i.drawRange,n=t.start/3,o=(t.start+t.count)/3,a=Math.max(0,n),s=Math.min(e,o)-a;return[{offset:Math.floor(a),count:Math.floor(s)}]}function Ne(i){if(!i.groups||!i.groups.length)return Fe(i);let e=[],t=new Set,n=i.drawRange,o=n.start/3,a=(n.start+n.count)/3;for(let r of i.groups){let c=r.start/3,u=(r.start+r.count)/3;t.add(Math.max(o,c)),t.add(Math.min(a,u))}let s=Array.from(t.values()).sort((r,c)=>r-c);for(let r=0;r<s.length-1;r++){let c=s[r],u=s[r+1];e.push({offset:Math.floor(c),count:Math.floor(u-c)})}return e}function _n(i){if(i.groups.length===0)return!1;let e=j(i),t=Ne(i).sort((a,s)=>a.offset-s.offset),n=t[t.length-1];n.count=Math.min(e-n.offset,n.count);let o=0;return t.forEach(({count:a})=>o+=a),e!==o}function Yt(i,e,t,n,o){let a=1/0,s=1/0,r=1/0,c=-1/0,u=-1/0,f=-1/0,p=1/0,l=1/0,d=1/0,x=-1/0,g=-1/0,b=-1/0;for(let m=e*6,h=(e+t)*6;m<h;m+=6){let y=i[m+0],v=i[m+1],A=y-v,T=y+v;A<a&&(a=A),T>c&&(c=T),y<p&&(p=y),y>x&&(x=y);let w=i[m+2],_=i[m+3],B=w-_,I=w+_;B<s&&(s=B),I>u&&(u=I),w<l&&(l=w),w>g&&(g=w);let P=i[m+4],S=i[m+5],M=P-S,E=P+S;M<r&&(r=M),E>f&&(f=E),P<d&&(d=P),P>b&&(b=P)}n[0]=a,n[1]=s,n[2]=r,n[3]=c,n[4]=u,n[5]=f,o[0]=p,o[1]=l,o[2]=d,o[3]=x,o[4]=g,o[5]=b}function Sn(i,e=null,t=null,n=null){let o=i.attributes.position,a=i.index?i.index.array:null,s=j(i),r=o.normalized,c;e===null?(c=new Float32Array(s*6*4),t=0,n=s):(c=e,t=t||0,n=n||s);let u=o.array,f=o.offset||0,p=3;o.isInterleavedBufferAttribute&&(p=o.data.stride);let l=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let x=d*3,g=d*6,b=x+0,m=x+1,h=x+2;a&&(b=a[b],m=a[m],h=a[h]),r||(b=b*p+f,m=m*p+f,h=h*p+f);for(let y=0;y<3;y++){let v,A,T;r?(v=o[l[y]](b),A=o[l[y]](m),T=o[l[y]](h)):(v=u[b+y],A=u[m+y],T=u[h+y]);let w=v;A<w&&(w=A),T<w&&(w=T);let _=v;A>_&&(_=A),T>_&&(_=T);let B=(_-w)/2,I=y*2;c[g+I+0]=w+B,c[g+I+1]=B+(Math.abs(w)+B)*wn}}return c}function D(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function Ce(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let o=i[n+3]-i[n];o>t&&(t=o,e=n)}return e}function Le(i,e){e.set(i)}function Re(i,e,t){let n,o;for(let a=0;a<3;a++){let s=a+3;n=i[a],o=e[a],t[a]=n<o?n:o,n=i[s],o=e[s],t[s]=n>o?n:o}}function Pt(i,e,t){for(let n=0;n<3;n++){let o=e[i+2*n],a=e[i+2*n+1],s=o-a,r=o+a;s<t[n]&&(t[n]=s),r>t[n+3]&&(t[n+3]=r)}}function lt(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}var Z=32,Wi=(i,e)=>i.candidate-e.candidate,J=new Array(Z).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),jt=new Float32Array(6);function Pn(i,e,t,n,o,a){let s=-1,r=0;if(a===0)s=Ce(e),s!==-1&&(r=(e[s]+e[s+3])/2);else if(a===1)s=Ce(i),s!==-1&&(r=Xi(t,n,o,s));else if(a===2){let c=lt(i),u=1.25*o,f=n*6,p=(n+o)*6;for(let l=0;l<3;l++){let d=e[l],b=(e[l+3]-d)/Z;if(o<Z/4){let m=[...J];m.length=o;let h=0;for(let v=f;v<p;v+=6,h++){let A=m[h];A.candidate=t[v+2*l],A.count=0;let{bounds:T,leftCacheBounds:w,rightCacheBounds:_}=A;for(let B=0;B<3;B++)_[B]=1/0,_[B+3]=-1/0,w[B]=1/0,w[B+3]=-1/0,T[B]=1/0,T[B+3]=-1/0;Pt(v,t,T)}m.sort(Wi);let y=o;for(let v=0;v<y;v++){let A=m[v];for(;v+1<y&&m[v+1].candidate===A.candidate;)m.splice(v+1,1),y--}for(let v=f;v<p;v+=6){let A=t[v+2*l];for(let T=0;T<y;T++){let w=m[T];A>=w.candidate?Pt(v,t,w.rightCacheBounds):(Pt(v,t,w.leftCacheBounds),w.count++)}}for(let v=0;v<y;v++){let A=m[v],T=A.count,w=o-A.count,_=A.leftCacheBounds,B=A.rightCacheBounds,I=0;T!==0&&(I=lt(_)/c);let P=0;w!==0&&(P=lt(B)/c);let S=1+1.25*(I*T+P*w);S<u&&(s=l,u=S,r=A.candidate)}}else{for(let y=0;y<Z;y++){let v=J[y];v.count=0,v.candidate=d+b+y*b;let A=v.bounds;for(let T=0;T<3;T++)A[T]=1/0,A[T+3]=-1/0}for(let y=f;y<p;y+=6){let T=~~((t[y+2*l]-d)/b);T>=Z&&(T=Z-1);let w=J[T];w.count++,Pt(y,t,w.bounds)}let m=J[Z-1];Le(m.bounds,m.rightCacheBounds);for(let y=Z-2;y>=0;y--){let v=J[y],A=J[y+1];Re(v.bounds,A.rightCacheBounds,v.rightCacheBounds)}let h=0;for(let y=0;y<Z-1;y++){let v=J[y],A=v.count,T=v.bounds,_=J[y+1].rightCacheBounds;A!==0&&(h===0?Le(T,jt):Re(T,jt,jt)),h+=A;let B=0,I=0;h!==0&&(B=lt(jt)/c);let P=o-h;P!==0&&(I=lt(_)/c);let S=1+1.25*(B*h+I*P);S<u&&(s=l,u=S,r=v.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${a} used.`);return{axis:s,pos:r}}function Xi(i,e,t,n){let o=0;for(let a=e,s=e+t;a<s;a++)o+=i[a*6+n*2];return o/t}var ft=class{constructor(){this.boundingData=new Float32Array(6)}};function Mn(i,e,t,n,o,a){let s=n,r=n+o-1,c=a.pos,u=a.axis*2;for(;;){for(;s<=r&&t[s*6+u]<c;)s++;for(;s<=r&&t[r*6+u]>=c;)r--;if(s<r){for(let f=0;f<3;f++){let p=e[s*3+f];e[s*3+f]=e[r*3+f],e[r*3+f]=p}for(let f=0;f<6;f++){let p=t[s*6+f];t[s*6+f]=t[r*6+f],t[r*6+f]=p}s++,r--}else return s}}function En(i,e,t,n,o,a){let s=n,r=n+o-1,c=a.pos,u=a.axis*2;for(;;){for(;s<=r&&t[s*6+u]<c;)s++;for(;s<=r&&t[r*6+u]>=c;)r--;if(s<r){let f=i[s];i[s]=i[r],i[r]=f;for(let p=0;p<6;p++){let l=t[s*6+p];t[s*6+p]=t[r*6+p],t[r*6+p]=l}s++,r--}else return s}}function L(i,e){return e[i+15]===65535}function R(i,e){return e[i+6]}function z(i,e){return e[i+14]}function O(i){return i+8}function k(i,e){return e[i+6]}function ut(i,e){return e[i+7]}var Dn,Mt,Zt,Fn,Gi=Math.pow(2,32);function Kt(i){return"count"in i?1:1+Kt(i.left)+Kt(i.right)}function Nn(i,e,t){return Dn=new Float32Array(t),Mt=new Uint32Array(t),Zt=new Uint16Array(t),Fn=new Uint8Array(t),Ue(i,e)}function Ue(i,e){let t=i/4,n=i/2,o="count"in e,a=e.boundingData;for(let s=0;s<6;s++)Dn[t+s]=a[s];if(o)if(e.buffer){let s=e.buffer;Fn.set(new Uint8Array(s),i);for(let r=i,c=i+s.byteLength;r<c;r+=32){let u=r/2;L(u,Zt)||(Mt[r/4+6]+=t)}return i+s.byteLength}else{let s=e.offset,r=e.count;return Mt[t+6]=s,Zt[n+14]=r,Zt[n+15]=65535,i+32}else{let s=e.left,r=e.right,c=e.splitAxis,u;if(u=Ue(i+32,s),u/4>Gi)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Mt[t+6]=u/4,u=Ue(u,r),Mt[t+7]=c,u}}function Yi(i,e){let t=(i.index?i.index.count:i.attributes.position.count)/3,n=t>2**16,o=n?4:2,a=e?new SharedArrayBuffer(t*o):new ArrayBuffer(t*o),s=n?new Uint32Array(a):new Uint16Array(a);for(let r=0,c=s.length;r<c;r++)s[r]=r;return s}function ji(i,e,t,n,o){let{maxDepth:a,verbose:s,maxLeafTris:r,strategy:c,onProgress:u,indirect:f}=o,p=i._indirectBuffer,l=i.geometry,d=l.index?l.index.array:null,x=f?En:Mn,g=j(l),b=new Float32Array(6),m=!1,h=new ft;return Yt(e,t,n,h.boundingData,b),v(h,t,n,b),h;function y(A){u&&u(A/g)}function v(A,T,w,_=null,B=0){if(!m&&B>=a&&(m=!0,s&&(console.warn(`MeshBVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),w<=r||B>=a)return y(T+w),A.offset=T,A.count=w,A;let I=Pn(A.boundingData,_,e,T,w,c);if(I.axis===-1)return y(T+w),A.offset=T,A.count=w,A;let P=x(p,d,e,T,w,I);if(P===T||P===T+w)y(T+w),A.offset=T,A.count=w;else{A.splitAxis=I.axis;let S=new ft,M=T,E=P-T;A.left=S,Yt(e,M,E,S.boundingData,b),v(S,M,E,b,B+1);let N=new ft,V=P,$=w-E;A.right=N,Yt(e,V,$,N.boundingData,b),v(N,V,$,b,B+1)}return A}}function Cn(i,e){let t=i.geometry;e.indirect&&(i._indirectBuffer=Yi(t,e.useSharedArrayBuffer),_n(t)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),i._indirectBuffer||Bn(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,o=Sn(t),a=e.indirect?Fe(t):Ne(t);i._roots=a.map(s=>{let r=ji(i,o,s.offset,s.count,e),c=Kt(r),u=new n(32*c);return Nn(0,r,u),u})}import{Vector3 as tt,Matrix4 as Rn,Line3 as zn}from"./three.module.js";import{Vector3 as Zi}from"./three.module.js";var W=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,o=-1/0;for(let a=0,s=e.length;a<s;a++){let c=e[a][t];n=c<n?c:n,o=c>o?c:o}this.min=n,this.max=o}setFromPoints(e,t){let n=1/0,o=-1/0;for(let a=0,s=t.length;a<s;a++){let r=t[a],c=e.dot(r);n=c<n?c:n,o=c>o?c:o}this.min=n,this.max=o}isSeparated(e){return this.min>e.max||e.min>this.max}};W.prototype.setFromBox=(function(){let i=new Zi;return function(t,n){let o=n.min,a=n.max,s=1/0,r=-1/0;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){i.x=o.x*c+a.x*(1-c),i.y=o.y*u+a.y*(1-u),i.z=o.z*f+a.z*(1-f);let p=t.dot(i);s=Math.min(p,s),r=Math.max(p,r)}this.min=s,this.max=r}})();var Ys=(function(){let i=new W;return function(t,n){let o=t.points,a=t.satAxes,s=t.satBounds,r=n.points,c=n.satAxes,u=n.satBounds;for(let f=0;f<3;f++){let p=s[f],l=a[f];if(i.setFromPoints(l,r),p.isSeparated(i))return!1}for(let f=0;f<3;f++){let p=u[f],l=c[f];if(i.setFromPoints(l,o),p.isSeparated(i))return!1}}})();import{Triangle as to,Vector3 as X,Line3 as pt,Sphere as eo,Plane as no}from"./three.module.js";import{Vector3 as ot,Vector2 as Ki,Plane as $i,Line3 as Ji}from"./three.module.js";var Qi=(function(){let i=new ot,e=new ot,t=new ot;return function(o,a,s){let r=o.start,c=i,u=a.start,f=e;t.subVectors(r,u),i.subVectors(o.end,o.start),e.subVectors(a.end,a.start);let p=t.dot(f),l=f.dot(c),d=f.dot(f),x=t.dot(c),b=c.dot(c)*d-l*l,m,h;b!==0?m=(p*l-x*d)/b:m=0,h=(p+m*l)/d,s.x=m,s.y=h}})(),Et=(function(){let i=new Ki,e=new ot,t=new ot;return function(o,a,s,r){Qi(o,a,i);let c=i.x,u=i.y;if(c>=0&&c<=1&&u>=0&&u<=1){o.at(c,s),a.at(u,r);return}else if(c>=0&&c<=1){u<0?a.at(0,r):a.at(1,r),o.closestPointToPoint(r,!0,s);return}else if(u>=0&&u<=1){c<0?o.at(0,s):o.at(1,s),a.closestPointToPoint(s,!0,r);return}else{let f;c<0?f=o.start:f=o.end;let p;u<0?p=a.start:p=a.end;let l=e,d=t;if(o.closestPointToPoint(p,!0,e),a.closestPointToPoint(f,!0,t),l.distanceToSquared(p)<=d.distanceToSquared(f)){s.copy(l),r.copy(p);return}else{s.copy(f),r.copy(d);return}}}})(),Ln=(function(){let i=new ot,e=new ot,t=new $i,n=new Ji;return function(a,s){let{radius:r,center:c}=a,{a:u,b:f,c:p}=s;if(n.start=u,n.end=f,n.closestPointToPoint(c,!0,i).distanceTo(c)<=r||(n.start=u,n.end=p,n.closestPointToPoint(c,!0,i).distanceTo(c)<=r)||(n.start=f,n.end=p,n.closestPointToPoint(c,!0,i).distanceTo(c)<=r))return!0;let g=s.getPlane(t);if(Math.abs(g.distanceToPoint(c))<=r){let m=g.projectPoint(c,e);if(s.containsPoint(m))return!0}return!1}})();var io=1e-15;function Ve(i){return Math.abs(i)<io}var H=class extends to{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new X),this.satBounds=new Array(4).fill().map(()=>new W),this.points=[this.a,this.b,this.c],this.sphere=new eo,this.plane=new no,this.needsUpdate=!0}intersectsSphere(e){return Ln(e,this)}update(){let e=this.a,t=this.b,n=this.c,o=this.points,a=this.satAxes,s=this.satBounds,r=a[0],c=s[0];this.getNormal(r),c.setFromPoints(r,o);let u=a[1],f=s[1];u.subVectors(e,t),f.setFromPoints(u,o);let p=a[2],l=s[2];p.subVectors(t,n),l.setFromPoints(p,o);let d=a[3],x=s[3];d.subVectors(n,e),x.setFromPoints(d,o),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(r,e),this.needsUpdate=!1}};H.prototype.closestPointToSegment=(function(){let i=new X,e=new X,t=new pt;return function(o,a=null,s=null){let{start:r,end:c}=o,u=this.points,f,p=1/0;for(let l=0;l<3;l++){let d=(l+1)%3;t.start.copy(u[l]),t.end.copy(u[d]),Et(t,o,i,e),f=i.distanceToSquared(e),f<p&&(p=f,a&&a.copy(i),s&&s.copy(e))}return this.closestPointToPoint(r,i),f=r.distanceToSquared(i),f<p&&(p=f,a&&a.copy(i),s&&s.copy(r)),this.closestPointToPoint(c,i),f=c.distanceToSquared(i),f<p&&(p=f,a&&a.copy(i),s&&s.copy(c)),Math.sqrt(p)}})();H.prototype.intersectsTriangle=(function(){let i=new H,e=new Array(3),t=new Array(3),n=new W,o=new W,a=new X,s=new X,r=new X,c=new X,u=new X,f=new pt,p=new pt,l=new pt,d=new X;function x(g,b,m){let h=g.points,y=0,v=-1;for(let A=0;A<3;A++){let{start:T,end:w}=f;T.copy(h[A]),w.copy(h[(A+1)%3]),f.delta(s);let _=Ve(b.distanceToPoint(T));if(Ve(b.normal.dot(s))&&_){m.copy(f),y=2;break}let B=b.intersectLine(f,d);if(!B&&_&&d.copy(T),(B||_)&&!Ve(d.distanceTo(w))){if(y<=1)(y===1?m.start:m.end).copy(d),_&&(v=y);else if(y>=2){(v===1?m.start:m.end).copy(d),y=2;break}if(y++,y===2&&v===-1)break}}return y}return function(b,m=null,h=!1){this.needsUpdate&&this.update(),b.isExtendedTriangle?b.needsUpdate&&b.update():(i.copy(b),i.update(),b=i);let y=this.plane,v=b.plane;if(Math.abs(y.normal.dot(v.normal))>1-1e-10){let A=this.satBounds,T=this.satAxes;t[0]=b.a,t[1]=b.b,t[2]=b.c;for(let B=0;B<4;B++){let I=A[B],P=T[B];if(n.setFromPoints(P,t),I.isSeparated(n))return!1}let w=b.satBounds,_=b.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let B=0;B<4;B++){let I=w[B],P=_[B];if(n.setFromPoints(P,e),I.isSeparated(n))return!1}for(let B=0;B<4;B++){let I=T[B];for(let P=0;P<4;P++){let S=_[P];if(a.crossVectors(I,S),n.setFromPoints(a,e),o.setFromPoints(a,t),n.isSeparated(o))return!1}}return m&&(h||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{let A=x(this,v,p);if(A===1&&b.containsPoint(p.end))return m&&(m.start.copy(p.end),m.end.copy(p.end)),!0;if(A!==2)return!1;let T=x(b,y,l);if(T===1&&this.containsPoint(l.end))return m&&(m.start.copy(l.end),m.end.copy(l.end)),!0;if(T!==2)return!1;if(p.delta(r),l.delta(c),r.dot(c)<0){let M=l.start;l.start=l.end,l.end=M}let w=p.start.dot(r),_=p.end.dot(r),B=l.start.dot(r),I=l.end.dot(r),P=_<B,S=w<I;return w!==I&&B!==_&&P===S?!1:(m&&(u.subVectors(p.start,l.start),u.dot(r)>0?m.start.copy(p.start):m.start.copy(l.start),u.subVectors(p.end,l.end),u.dot(r)<0?m.end.copy(p.end):m.end.copy(l.end)),!0)}}})();H.prototype.distanceToPoint=(function(){let i=new X;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();H.prototype.distanceToTriangle=(function(){let i=new X,e=new X,t=["a","b","c"],n=new pt,o=new pt;return function(s,r=null,c=null){let u=r||c?n:null;if(this.intersectsTriangle(s,u))return(r||c)&&(r&&u.getCenter(r),c&&u.getCenter(c)),0;let f=1/0;for(let p=0;p<3;p++){let l,d=t[p],x=s[d];this.closestPointToPoint(x,i),l=x.distanceToSquared(i),l<f&&(f=l,r&&r.copy(i),c&&c.copy(x));let g=this[d];s.closestPointToPoint(g,i),l=g.distanceToSquared(i),l<f&&(f=l,r&&r.copy(g),c&&c.copy(i))}for(let p=0;p<3;p++){let l=t[p],d=t[(p+1)%3];n.set(this[l],this[d]);for(let x=0;x<3;x++){let g=t[x],b=t[(x+1)%3];o.set(s[g],s[b]),Et(n,o,i,e);let m=i.distanceToSquared(e);m<f&&(f=m,r&&r.copy(i),c&&c.copy(e))}}return Math.sqrt(f)}})();var U=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new tt,this.max=new tt,this.matrix=new Rn,this.invMatrix=new Rn,this.points=new Array(8).fill().map(()=>new tt),this.satAxes=new Array(3).fill().map(()=>new tt),this.satBounds=new Array(3).fill().map(()=>new W),this.alignedSatBounds=new Array(3).fill().map(()=>new W),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};U.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,o=this.points;for(let u=0;u<=1;u++)for(let f=0;f<=1;f++)for(let p=0;p<=1;p++){let l=1*u|2*f|4*p,d=o[l];d.x=u?n.x:t.x,d.y=f?n.y:t.y,d.z=p?n.z:t.z,d.applyMatrix4(e)}let a=this.satBounds,s=this.satAxes,r=o[0];for(let u=0;u<3;u++){let f=s[u],p=a[u],l=1<<u,d=o[l];f.subVectors(r,d),p.setFromPoints(f,o)}let c=this.alignedSatBounds;c[0].setFromPointsField(o,"x"),c[1].setFromPointsField(o,"y"),c[2].setFromPointsField(o,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();U.prototype.intersectsBox=(function(){let i=new W;return function(t){this.needsUpdate&&this.update();let n=t.min,o=t.max,a=this.satBounds,s=this.satAxes,r=this.alignedSatBounds;if(i.min=n.x,i.max=o.x,r[0].isSeparated(i)||(i.min=n.y,i.max=o.y,r[1].isSeparated(i))||(i.min=n.z,i.max=o.z,r[2].isSeparated(i)))return!1;for(let c=0;c<3;c++){let u=s[c],f=a[c];if(i.setFromBox(u,t),f.isSeparated(i))return!1}return!0}})();U.prototype.intersectsTriangle=(function(){let i=new H,e=new Array(3),t=new W,n=new W,o=new tt;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(i.copy(s),i.update(),s=i);let r=this.satBounds,c=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let l=0;l<3;l++){let d=r[l],x=c[l];if(t.setFromPoints(x,e),d.isSeparated(t))return!1}let u=s.satBounds,f=s.satAxes,p=this.points;for(let l=0;l<3;l++){let d=u[l],x=f[l];if(t.setFromPoints(x,p),d.isSeparated(t))return!1}for(let l=0;l<3;l++){let d=c[l];for(let x=0;x<4;x++){let g=f[x];if(o.crossVectors(d,g),t.setFromPoints(o,e),n.setFromPoints(o,p),t.isSeparated(n))return!1}}return!0}})();U.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();U.prototype.distanceToPoint=(function(){let i=new tt;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();U.prototype.distanceToBox=(function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new zn),t=new Array(12).fill().map(()=>new zn),n=new tt,o=new tt;return function(s,r=0,c=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(c||u)&&(s.getCenter(o),this.closestPointToPoint(o,n),s.closestPointToPoint(n,o),c&&c.copy(n),u&&u.copy(o)),0;let f=r*r,p=s.min,l=s.max,d=this.points,x=1/0;for(let b=0;b<8;b++){let m=d[b];o.copy(m).clamp(p,l);let h=m.distanceToSquared(o);if(h<x&&(x=h,c&&c.copy(m),u&&u.copy(o),h<f))return Math.sqrt(h)}let g=0;for(let b=0;b<3;b++)for(let m=0;m<=1;m++)for(let h=0;h<=1;h++){let y=(b+1)%3,v=(b+2)%3,A=m<<y|h<<v,T=1<<b|m<<y|h<<v,w=d[A],_=d[T];e[g].set(w,_);let I=i[b],P=i[y],S=i[v],M=t[g],E=M.start,N=M.end;E[I]=p[I],E[P]=m?p[P]:l[P],E[S]=h?p[S]:l[P],N[I]=l[I],N[P]=m?p[P]:l[P],N[S]=h?p[S]:l[P],g++}for(let b=0;b<=1;b++)for(let m=0;m<=1;m++)for(let h=0;h<=1;h++){o.x=b?l.x:p.x,o.y=m?l.y:p.y,o.z=h?l.z:p.z,this.closestPointToPoint(o,n);let y=o.distanceToSquared(n);if(y<x&&(x=y,c&&c.copy(n),u&&u.copy(o),y<f))return Math.sqrt(y)}for(let b=0;b<12;b++){let m=e[b];for(let h=0;h<12;h++){let y=t[h];Et(m,y,n,o);let v=n.distanceToSquared(o);if(v<x&&(x=v,c&&c.copy(n),u&&u.copy(o),v<f))return Math.sqrt(v)}}return Math.sqrt(x)}})();var et=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var ke=class extends et{constructor(){super(()=>new H)}},q=new ke;import{Box3 as oo}from"./three.module.js";var Oe=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},F=new Oe;var nt,mt,dt=[],Jt=new et(()=>new oo);function Un(i,e,t,n,o,a){nt=Jt.getPrimitive(),mt=Jt.getPrimitive(),dt.push(nt,mt),F.setBuffer(i._roots[e]);let s=He(0,i.geometry,t,n,o,a);F.clearBuffer(),Jt.releasePrimitive(nt),Jt.releasePrimitive(mt),dt.pop(),dt.pop();let r=dt.length;return r>0&&(mt=dt[r-1],nt=dt[r-2]),s}function He(i,e,t,n,o=null,a=0,s=0){let{float32Array:r,uint16Array:c,uint32Array:u}=F,f=i*2;if(L(f,c)){let l=R(i,u),d=z(f,c);return D(i,r,nt),n(l,d,!1,s,a+i,nt)}else{let I=function(S){let{uint16Array:M,uint32Array:E}=F,N=S*2;for(;!L(N,M);)S=O(S),N=S*2;return R(S,E)},P=function(S){let{uint16Array:M,uint32Array:E}=F,N=S*2;for(;!L(N,M);)S=k(S,E),N=S*2;return R(S,E)+z(N,M)},l=O(i),d=k(i,u),x=l,g=d,b,m,h,y;if(o&&(h=nt,y=mt,D(x,r,h),D(g,r,y),b=o(h),m=o(y),m<b)){x=d,g=l;let S=b;b=m,m=S,h=y}h||(h=nt,D(x,r,h));let v=L(x*2,c),A=t(h,v,b,s+1,a+x),T;if(A===2){let S=I(x),E=P(x)-S;T=n(S,E,!0,s+1,a+x,h)}else T=A&&He(x,e,t,n,o,a,s+1);if(T)return!0;y=mt,D(g,r,y);let w=L(g*2,c),_=t(y,w,m,s+1,a+g),B;if(_===2){let S=I(g),E=P(g)-S;B=n(S,E,!0,s+1,a+g,y)}else B=_&&He(g,e,t,n,o,a,s+1);return!!B}}import{Vector3 as Vn}from"./three.module.js";var Dt=new Vn,qe=new Vn;function kn(i,e,t={},n=0,o=1/0){let a=n*n,s=o*o,r=1/0,c=null;if(i.shapecast({boundsTraverseOrder:f=>(Dt.copy(e).clamp(f.min,f.max),Dt.distanceToSquared(e)),intersectsBounds:(f,p,l)=>l<r&&l<s,intersectsTriangle:(f,p)=>{f.closestPointToPoint(e,Dt);let l=e.distanceToSquared(Dt);return l<r&&(qe.copy(Dt),r=l,c=p),l<a}}),r===1/0)return null;let u=Math.sqrt(r);return t.point?t.point.copy(qe):t.point=qe.clone(),t.distance=u,t.faceIndex=c,t}import{Vector3 as K,Vector2 as Ft,Triangle as te,DoubleSide as so,BackSide as ro}from"./three.module.js";var ht=new K,xt=new K,yt=new K,ee=new Ft,ne=new Ft,ie=new Ft,On=new K,Hn=new K,qn=new K,oe=new K;function co(i,e,t,n,o,a){let s;return a===ro?s=i.intersectTriangle(n,t,e,!0,o):s=i.intersectTriangle(e,t,n,a!==so,o),s===null?null:{distance:i.origin.distanceTo(o),point:o.clone()}}function ao(i,e,t,n,o,a,s,r,c){ht.fromBufferAttribute(e,a),xt.fromBufferAttribute(e,s),yt.fromBufferAttribute(e,r);let u=co(i,ht,xt,yt,oe,c);if(u){n&&(ee.fromBufferAttribute(n,a),ne.fromBufferAttribute(n,s),ie.fromBufferAttribute(n,r),u.uv=te.getInterpolation(oe,ht,xt,yt,ee,ne,ie,new Ft)),o&&(ee.fromBufferAttribute(o,a),ne.fromBufferAttribute(o,s),ie.fromBufferAttribute(o,r),u.uv1=te.getInterpolation(oe,ht,xt,yt,ee,ne,ie,new Ft)),t&&(On.fromBufferAttribute(t,a),Hn.fromBufferAttribute(t,s),qn.fromBufferAttribute(t,r),u.normal=te.getInterpolation(oe,ht,xt,yt,On,Hn,qn,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:s,c:r,normal:new K,materialIndex:0};te.getNormal(ht,xt,yt,f.normal),u.face=f,u.faceIndex=a}return u}function bt(i,e,t,n,o){let a=n*3,s=a+0,r=a+1,c=a+2,u=i.index;i.index&&(s=u.getX(s),r=u.getX(r),c=u.getX(c));let{position:f,normal:p,uv:l,uv1:d}=i.attributes,x=ao(t,f,p,l,d,s,r,c,e);return x?(x.faceIndex=n,o&&o.push(x),x):null}import{Vector2 as ae,Vector3 as Nt,Triangle as We}from"./three.module.js";function C(i,e,t,n){let o=i.a,a=i.b,s=i.c,r=e,c=e+1,u=e+2;t&&(r=t.getX(r),c=t.getX(c),u=t.getX(u)),o.x=n.getX(r),o.y=n.getY(r),o.z=n.getZ(r),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c),s.x=n.getX(u),s.y=n.getY(u),s.z=n.getZ(u)}var se=new Nt,re=new Nt,ce=new Nt,Wn=new ae,Xn=new ae,Gn=new ae;function lo(i,e,t,n){let o=e.getIndex().array,a=e.getAttribute("position"),s=e.getAttribute("uv"),r=o[t*3],c=o[t*3+1],u=o[t*3+2];se.fromBufferAttribute(a,r),re.fromBufferAttribute(a,c),ce.fromBufferAttribute(a,u);let f=0,p=e.groups,l=t*3;for(let x=0,g=p.length;x<g;x++){let b=p[x],{start:m,count:h}=b;if(l>=m&&l<m+h){f=b.materialIndex;break}}let d=null;return s&&(Wn.fromBufferAttribute(s,r),Xn.fromBufferAttribute(s,c),Gn.fromBufferAttribute(s,u),n&&n.uv?d=n.uv:d=new ae,We.getInterpolation(i,se,re,ce,Wn,Xn,Gn,d)),n?(n.face||(n.face={}),n.face.a=r,n.face.b=c,n.face.c=u,n.face.materialIndex=f,n.face.normal||(n.face.normal=new Nt),We.getNormal(se,re,ce,n.face.normal),d&&(n.uv=d),n):{face:{a:r,b:c,c:u,materialIndex:f,normal:We.getNormal(se,re,ce,new Nt)},uv:d}}function Yn(i,e,t,n,o,a){let{geometry:s,_indirectBuffer:r}=i;for(let c=n,u=n+o;c<u;c++)bt(s,e,t,c,a)}function jn(i,e,t,n,o){let{geometry:a,_indirectBuffer:s}=i,r=1/0,c=null;for(let u=n,f=n+o;u<f;u++){let p;p=bt(a,e,t,u),p&&p.distance<r&&(c=p,r=p.distance)}return c}function Zn(i,e,t,n,o,a,s){let{geometry:r}=t,{index:c}=r,u=r.attributes.position;for(let f=i,p=e+i;f<p;f++){let l;if(l=f,C(s,l*3,c,u),s.needsUpdate=!0,n(s,l,o,a))return!0}return!1}function Kn(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,o=t.attributes.position,a,s,r,c,u=0,f=i._roots;for(let l=0,d=f.length;l<d;l++)a=f[l],s=new Uint32Array(a),r=new Uint16Array(a),c=new Float32Array(a),p(0,u),u+=a.byteLength;function p(l,d,x=!1){let g=l*2;if(r[g+15]===65535){let m=s[l+6],h=r[g+14],y=1/0,v=1/0,A=1/0,T=-1/0,w=-1/0,_=-1/0;for(let B=3*m,I=3*(m+h);B<I;B++){let P=n[B],S=o.getX(P),M=o.getY(P),E=o.getZ(P);S<y&&(y=S),S>T&&(T=S),M<v&&(v=M),M>w&&(w=M),E<A&&(A=E),E>_&&(_=E)}return c[l+0]!==y||c[l+1]!==v||c[l+2]!==A||c[l+3]!==T||c[l+4]!==w||c[l+5]!==_?(c[l+0]=y,c[l+1]=v,c[l+2]=A,c[l+3]=T,c[l+4]=w,c[l+5]=_,!0):!1}else{let m=l+8,h=s[l+6],y=m+d,v=h+d,A=x,T=!1,w=!1;e?A||(T=e.has(y),w=e.has(v),A=!T&&!w):(T=!0,w=!0);let _=A||T,B=A||w,I=!1;_&&(I=p(m,d,A));let P=!1;B&&(P=p(h,d,A));let S=I||P;if(S)for(let M=0;M<3;M++){let E=m+M,N=h+M,V=c[E],$=c[E+3],St=c[N],It=c[N+3];c[l+M]=V<St?V:St,c[l+M+3]=$>It?$:It}return S}}}import{Vector3 as uo}from"./three.module.js";import{Box3 as fo}from"./three.module.js";var $n=new fo;function G(i,e,t,n){return D(i,e,$n),t.intersectBox($n,n)}function Jn(i,e,t,n,o,a){let{geometry:s,_indirectBuffer:r}=i;for(let c=n,u=n+o;c<u;c++){let f=r?r[c]:c;bt(s,e,t,f,a)}}function Qn(i,e,t,n,o){let{geometry:a,_indirectBuffer:s}=i,r=1/0,c=null;for(let u=n,f=n+o;u<f;u++){let p;p=bt(a,e,t,s?s[u]:u),p&&p.distance<r&&(c=p,r=p.distance)}return c}function ti(i,e,t,n,o,a,s){let{geometry:r}=t,{index:c}=r,u=r.attributes.position;for(let f=i,p=e+i;f<p;f++){let l;if(l=t.resolveTriangleIndex(f),C(s,l*3,c,u),s.needsUpdate=!0,n(s,l,o,a))return!0}return!1}var ei=new uo;function ni(i,e,t,n,o){F.setBuffer(i._roots[e]),Xe(0,i,t,n,o),F.clearBuffer()}function Xe(i,e,t,n,o){let{float32Array:a,uint16Array:s,uint32Array:r}=F,c=i*2;if(L(c,s)){let f=R(i,r),p=z(c,s);Yn(e,t,n,f,p,o)}else{let f=O(i);G(f,a,n,ei)&&Xe(f,e,t,n,o);let p=k(i,r);G(p,a,n,ei)&&Xe(p,e,t,n,o)}}import{Vector3 as po}from"./three.module.js";var ii=new po,mo=["x","y","z"];function oi(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ge(0,i,t,n);return F.clearBuffer(),o}function Ge(i,e,t,n){let{float32Array:o,uint16Array:a,uint32Array:s}=F,r=i*2;if(L(r,a)){let u=R(i,s),f=z(r,a);return jn(e,t,n,u,f)}else{let u=ut(i,s),f=mo[u],l=n.direction[f]>=0,d,x;l?(d=O(i),x=k(i,s)):(d=k(i,s),x=O(i));let b=G(d,o,n,ii)?Ge(d,e,t,n):null;if(b){let y=b.point[f];if(l?y<=o[x+u]:y>=o[x+u+3])return b}let h=G(x,o,n,ii)?Ge(x,e,t,n):null;return b&&h?b.distance<=h.distance?b:h:b||h||null}}import{Box3 as ho,Matrix4 as xo}from"./three.module.js";var le=new ho,At=new H,gt=new H,Ct=new xo,si=new U,fe=new U;function ri(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ye(0,i,t,n);return F.clearBuffer(),o}function Ye(i,e,t,n,o=null){let{float32Array:a,uint16Array:s,uint32Array:r}=F,c=i*2;if(o===null&&(t.boundingBox||t.computeBoundingBox(),si.set(t.boundingBox.min,t.boundingBox.max,n),o=si),L(c,s)){let f=e.geometry,p=f.index,l=f.attributes.position,d=t.index,x=t.attributes.position,g=R(i,r),b=z(c,s);if(Ct.copy(n).invert(),t.boundsTree)return D(i,a,fe),fe.matrix.copy(Ct),fe.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:h=>fe.intersectsBox(h),intersectsTriangle:h=>{h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let y=g*3,v=(b+g)*3;y<v;y+=3)if(C(gt,y,p,l),gt.needsUpdate=!0,h.intersectsTriangle(gt))return!0;return!1}});for(let m=g*3,h=(b+g)*3;m<h;m+=3){C(At,m,p,l),At.a.applyMatrix4(Ct),At.b.applyMatrix4(Ct),At.c.applyMatrix4(Ct),At.needsUpdate=!0;for(let y=0,v=d.count;y<v;y+=3)if(C(gt,y,d,x),gt.needsUpdate=!0,At.intersectsTriangle(gt))return!0}}else{let f=i+8,p=r[i+6];return D(f,a,le),!!(o.intersectsBox(le)&&Ye(f,e,t,n,o)||(D(p,a,le),o.intersectsBox(le)&&Ye(p,e,t,n,o)))}}import{Matrix4 as yo,Vector3 as pe}from"./three.module.js";var ue=new yo,je=new U,Lt=new U,bo=new pe,Ao=new pe,go=new pe,vo=new pe;function ci(i,e,t,n={},o={},a=0,s=1/0){e.boundingBox||e.computeBoundingBox(),je.set(e.boundingBox.min,e.boundingBox.max,t),je.needsUpdate=!0;let r=i.geometry,c=r.attributes.position,u=r.index,f=e.attributes.position,p=e.index,l=q.getPrimitive(),d=q.getPrimitive(),x=bo,g=Ao,b=null,m=null;o&&(b=go,m=vo);let h=1/0,y=null,v=null;return ue.copy(t).invert(),Lt.matrix.copy(ue),i.shapecast({boundsTraverseOrder:A=>je.distanceToBox(A),intersectsBounds:(A,T,w)=>w<h&&w<s?(T&&(Lt.min.copy(A.min),Lt.max.copy(A.max),Lt.needsUpdate=!0),!0):!1,intersectsRange:(A,T)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:_=>Lt.distanceToBox(_),intersectsBounds:(_,B,I)=>I<h&&I<s,intersectsRange:(_,B)=>{for(let I=_,P=_+B;I<P;I++){C(d,3*I,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let S=A,M=A+T;S<M;S++){C(l,3*S,u,c),l.needsUpdate=!0;let E=l.distanceToTriangle(d,x,b);if(E<h&&(g.copy(x),m&&m.copy(b),h=E,y=S,v=I),E<a)return!0}}}});{let w=j(e);for(let _=0,B=w;_<B;_++){C(d,3*_,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let I=A,P=A+T;I<P;I++){C(l,3*I,u,c),l.needsUpdate=!0;let S=l.distanceToTriangle(d,x,b);if(S<h&&(g.copy(x),m&&m.copy(b),h=S,y=I,v=_),S<a)return!0}}}}}),q.releasePrimitive(l),q.releasePrimitive(d),h===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=h,n.faceIndex=y,o&&(o.point?o.point.copy(m):o.point=m.clone(),o.point.applyMatrix4(ue),g.applyMatrix4(ue),o.distance=g.sub(o.point).length(),o.faceIndex=v),n)}function ai(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,o=t.attributes.position,a,s,r,c,u=0,f=i._roots;for(let l=0,d=f.length;l<d;l++)a=f[l],s=new Uint32Array(a),r=new Uint16Array(a),c=new Float32Array(a),p(0,u),u+=a.byteLength;function p(l,d,x=!1){let g=l*2;if(r[g+15]===65535){let m=s[l+6],h=r[g+14],y=1/0,v=1/0,A=1/0,T=-1/0,w=-1/0,_=-1/0;for(let B=m,I=m+h;B<I;B++){let P=3*i.resolveTriangleIndex(B);for(let S=0;S<3;S++){let M=P+S;M=n?n[M]:M;let E=o.getX(M),N=o.getY(M),V=o.getZ(M);E<y&&(y=E),E>T&&(T=E),N<v&&(v=N),N>w&&(w=N),V<A&&(A=V),V>_&&(_=V)}}return c[l+0]!==y||c[l+1]!==v||c[l+2]!==A||c[l+3]!==T||c[l+4]!==w||c[l+5]!==_?(c[l+0]=y,c[l+1]=v,c[l+2]=A,c[l+3]=T,c[l+4]=w,c[l+5]=_,!0):!1}else{let m=l+8,h=s[l+6],y=m+d,v=h+d,A=x,T=!1,w=!1;e?A||(T=e.has(y),w=e.has(v),A=!T&&!w):(T=!0,w=!0);let _=A||T,B=A||w,I=!1;_&&(I=p(m,d,A));let P=!1;B&&(P=p(h,d,A));let S=I||P;if(S)for(let M=0;M<3;M++){let E=m+M,N=h+M,V=c[E],$=c[E+3],St=c[N],It=c[N+3];c[l+M]=V<St?V:St,c[l+M+3]=$>It?$:It}return S}}}import{Vector3 as To}from"./three.module.js";var li=new To;function fi(i,e,t,n,o){F.setBuffer(i._roots[e]),Ze(0,i,t,n,o),F.clearBuffer()}function Ze(i,e,t,n,o){let{float32Array:a,uint16Array:s,uint32Array:r}=F,c=i*2;if(L(c,s)){let f=R(i,r),p=z(c,s);Jn(e,t,n,f,p,o)}else{let f=O(i);G(f,a,n,li)&&Ze(f,e,t,n,o);let p=k(i,r);G(p,a,n,li)&&Ze(p,e,t,n,o)}}import{Vector3 as wo}from"./three.module.js";var ui=new wo,Bo=["x","y","z"];function pi(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ke(0,i,t,n);return F.clearBuffer(),o}function Ke(i,e,t,n){let{float32Array:o,uint16Array:a,uint32Array:s}=F,r=i*2;if(L(r,a)){let u=R(i,s),f=z(r,a);return Qn(e,t,n,u,f)}else{let u=ut(i,s),f=Bo[u],l=n.direction[f]>=0,d,x;l?(d=O(i),x=k(i,s)):(d=k(i,s),x=O(i));let b=G(d,o,n,ui)?Ke(d,e,t,n):null;if(b){let y=b.point[f];if(l?y<=o[x+u]:y>=o[x+u+3])return b}let h=G(x,o,n,ui)?Ke(x,e,t,n):null;return b&&h?b.distance<=h.distance?b:h:b||h||null}}import{Box3 as _o,Matrix4 as So}from"./three.module.js";var de=new _o,vt=new H,Tt=new H,Rt=new So,di=new U,me=new U;function mi(i,e,t,n){F.setBuffer(i._roots[e]);let o=$e(0,i,t,n);return F.clearBuffer(),o}function $e(i,e,t,n,o=null){let{float32Array:a,uint16Array:s,uint32Array:r}=F,c=i*2;if(o===null&&(t.boundingBox||t.computeBoundingBox(),di.set(t.boundingBox.min,t.boundingBox.max,n),o=di),L(c,s)){let f=e.geometry,p=f.index,l=f.attributes.position,d=t.index,x=t.attributes.position,g=R(i,r),b=z(c,s);if(Rt.copy(n).invert(),t.boundsTree)return D(i,a,me),me.matrix.copy(Rt),me.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:h=>me.intersectsBox(h),intersectsTriangle:h=>{h.a.applyMatrix4(n),h.b.applyMatrix4(n),h.c.applyMatrix4(n),h.needsUpdate=!0;for(let y=g,v=b+g;y<v;y++)if(C(Tt,3*e.resolveTriangleIndex(y),p,l),Tt.needsUpdate=!0,h.intersectsTriangle(Tt))return!0;return!1}});for(let m=g,h=b+g;m<h;m++){let y=e.resolveTriangleIndex(m);C(vt,3*y,p,l),vt.a.applyMatrix4(Rt),vt.b.applyMatrix4(Rt),vt.c.applyMatrix4(Rt),vt.needsUpdate=!0;for(let v=0,A=d.count;v<A;v+=3)if(C(Tt,v,d,x),Tt.needsUpdate=!0,vt.intersectsTriangle(Tt))return!0}}else{let f=i+8,p=r[i+6];return D(f,a,de),!!(o.intersectsBox(de)&&$e(f,e,t,n,o)||(D(p,a,de),o.intersectsBox(de)&&$e(p,e,t,n,o)))}}import{Matrix4 as Io,Vector3 as xe}from"./three.module.js";var he=new Io,Je=new U,zt=new U,Po=new xe,Mo=new xe,Eo=new xe,Do=new xe;function hi(i,e,t,n={},o={},a=0,s=1/0){e.boundingBox||e.computeBoundingBox(),Je.set(e.boundingBox.min,e.boundingBox.max,t),Je.needsUpdate=!0;let r=i.geometry,c=r.attributes.position,u=r.index,f=e.attributes.position,p=e.index,l=q.getPrimitive(),d=q.getPrimitive(),x=Po,g=Mo,b=null,m=null;o&&(b=Eo,m=Do);let h=1/0,y=null,v=null;return he.copy(t).invert(),zt.matrix.copy(he),i.shapecast({boundsTraverseOrder:A=>Je.distanceToBox(A),intersectsBounds:(A,T,w)=>w<h&&w<s?(T&&(zt.min.copy(A.min),zt.max.copy(A.max),zt.needsUpdate=!0),!0):!1,intersectsRange:(A,T)=>{if(e.boundsTree){let w=e.boundsTree;return w.shapecast({boundsTraverseOrder:_=>zt.distanceToBox(_),intersectsBounds:(_,B,I)=>I<h&&I<s,intersectsRange:(_,B)=>{for(let I=_,P=_+B;I<P;I++){let S=w.resolveTriangleIndex(I);C(d,3*S,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let M=A,E=A+T;M<E;M++){let N=i.resolveTriangleIndex(M);C(l,3*N,u,c),l.needsUpdate=!0;let V=l.distanceToTriangle(d,x,b);if(V<h&&(g.copy(x),m&&m.copy(b),h=V,y=M,v=I),V<a)return!0}}}})}else{let w=j(e);for(let _=0,B=w;_<B;_++){C(d,3*_,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let I=A,P=A+T;I<P;I++){let S=i.resolveTriangleIndex(I);C(l,3*S,u,c),l.needsUpdate=!0;let M=l.distanceToTriangle(d,x,b);if(M<h&&(g.copy(x),m&&m.copy(b),h=M,y=I,v=_),M<a)return!0}}}}}),q.releasePrimitive(l),q.releasePrimitive(d),h===1/0?null:(n.point?n.point.copy(g):n.point=g.clone(),n.distance=h,n.faceIndex=y,o&&(o.point?o.point.copy(m):o.point=m.clone(),o.point.applyMatrix4(he),g.applyMatrix4(he),o.distance=g.sub(o.point).length(),o.faceIndex=v),n)}function ye(){return typeof SharedArrayBuffer<"u"}import{Box3 as Vt,Matrix4 as Fo}from"./three.module.js";var Ut=new F.constructor,be=new F.constructor,it=new et(()=>new Vt),wt=new Vt,Bt=new Vt,Qe=new Vt,tn=new Vt,en=!1;function xi(i,e,t,n){if(en)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");en=!0;let o=i._roots,a=e._roots,s,r=0,c=0,u=new Fo().copy(t).invert();for(let f=0,p=o.length;f<p;f++){Ut.setBuffer(o[f]),c=0;let l=it.getPrimitive();D(0,Ut.float32Array,l),l.applyMatrix4(u);for(let d=0,x=a.length;d<x&&(be.setBuffer(a[f]),s=Y(0,0,t,u,n,r,c,0,0,l),be.clearBuffer(),c+=a[d].length,!s);d++);if(it.releasePrimitive(l),Ut.clearBuffer(),r+=o[f].length,s)break}return en=!1,s}function Y(i,e,t,n,o,a=0,s=0,r=0,c=0,u=null,f=!1){let p,l;f?(p=be,l=Ut):(p=Ut,l=be);let d=p.float32Array,x=p.uint32Array,g=p.uint16Array,b=l.float32Array,m=l.uint32Array,h=l.uint16Array,y=i*2,v=e*2,A=L(y,g),T=L(v,h),w=!1;if(T&&A)f?w=o(R(e,m),z(e*2,h),R(i,x),z(i*2,g),c,s+e,r,a+i):w=o(R(i,x),z(i*2,g),R(e,m),z(e*2,h),r,a+i,c,s+e);else if(T){let _=it.getPrimitive();D(e,b,_),_.applyMatrix4(t);let B=O(i),I=k(i,x);D(B,d,wt),D(I,d,Bt);let P=_.intersectsBox(wt),S=_.intersectsBox(Bt);w=P&&Y(e,B,n,t,o,s,a,c,r+1,_,!f)||S&&Y(e,I,n,t,o,s,a,c,r+1,_,!f),it.releasePrimitive(_)}else{let _=O(e),B=k(e,m);D(_,b,Qe),D(B,b,tn);let I=u.intersectsBox(Qe),P=u.intersectsBox(tn);if(I&&P)w=Y(i,_,t,n,o,a,s,r,c+1,u,f)||Y(i,B,t,n,o,a,s,r,c+1,u,f);else if(I)if(A)w=Y(i,_,t,n,o,a,s,r,c+1,u,f);else{let S=it.getPrimitive();S.copy(Qe).applyMatrix4(t);let M=O(i),E=k(i,x);D(M,d,wt),D(E,d,Bt);let N=S.intersectsBox(wt),V=S.intersectsBox(Bt);w=N&&Y(_,M,n,t,o,s,a,c,r+1,S,!f)||V&&Y(_,E,n,t,o,s,a,c,r+1,S,!f),it.releasePrimitive(S)}else if(P)if(A)w=Y(i,B,t,n,o,a,s,r,c+1,u,f);else{let S=it.getPrimitive();S.copy(tn).applyMatrix4(t);let M=O(i),E=k(i,x);D(M,d,wt),D(E,d,Bt);let N=S.intersectsBox(wt),V=S.intersectsBox(Bt);w=N&&Y(B,M,n,t,o,s,a,c,r+1,S,!f)||V&&Y(B,E,n,t,o,s,a,c,r+1,S,!f),it.releasePrimitive(S)}}return w}var Ae=new U,bi=new Ai,Co={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0},st=class i{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,o=e._roots,a=e._indirectBuffer,s=n.getIndex(),r;return t.cloneBuffers?r={roots:o.map(c=>c.slice()),index:s.array.slice(),indirectBuffer:a?a.slice():null}:r={roots:o,index:s.array,indirectBuffer:a},r}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:o,roots:a,indirectBuffer:s}=e,r=new i(t,{...n,[Gt]:!0});if(r._roots=a,r._indirectBuffer=s||null,n.setIndex){let c=t.getIndex();if(c===null){let u=new No(e.index,1,!1);t.setIndex(u)}else c.array!==o&&(c.array.set(o),c.needsUpdate=!0)}return r}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...Co,[Gt]:!1},t),t.useSharedArrayBuffer&&!ye())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[Gt]||(Cn(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Ai)));let{_indirectBuffer:n}=this;this.resolveTriangleIndex=t.indirect?o=>n[o]:o=>o}refit(e=null){return(this.indirect?ai:Kn)(this,e)}traverse(e,t=0){let n=this._roots[t],o=new Uint32Array(n),a=new Uint16Array(n);s(0);function s(r,c=0){let u=r*2,f=a[u+15]===65535;if(f){let p=o[r+6],l=a[u+14];e(c,f,new Float32Array(n,r*4,6),p,l)}else{let p=r+32/4,l=o[r+6],d=o[r+7];e(c,f,new Float32Array(n,r*4,6),d)||(s(p,c+1),s(l,c+1))}}}raycast(e,t=yi){let n=this._roots,o=this.geometry,a=[],s=t.isMaterial,r=Array.isArray(t),c=o.groups,u=s?t.side:t,f=this.indirect?fi:ni;for(let p=0,l=n.length;p<l;p++){let d=r?t[c[p].materialIndex].side:u,x=a.length;if(f(this,p,d,e,a),r){let g=c[p].materialIndex;for(let b=x,m=a.length;b<m;b++)a[b].face.materialIndex=g}}return a}raycastFirst(e,t=yi){let n=this._roots,o=this.geometry,a=t.isMaterial,s=Array.isArray(t),r=null,c=o.groups,u=a?t.side:t,f=this.indirect?pi:oi;for(let p=0,l=n.length;p<l;p++){let d=s?t[c[p].materialIndex].side:u,x=f(this,p,d,e);x!=null&&(r==null||x.distance<r.distance)&&(r=x,s&&(x.face.materialIndex=c[p].materialIndex))}return r}intersectsGeometry(e,t){let n=!1,o=this._roots,a=this.indirect?mi:ri;for(let s=0,r=o.length;s<r&&(n=a(this,s,e,t),!n);s++);return n}shapecast(e){let t=q.getPrimitive(),n=this.indirect?ti:Zn,{boundsTraverseOrder:o,intersectsBounds:a,intersectsRange:s,intersectsTriangle:r}=e;if(s&&r){let p=s;s=(l,d,x,g,b)=>p(l,d,x,g,b)?!0:n(l,d,this,r,x,g,t)}else s||(r?s=(p,l,d,x)=>n(p,l,this,r,d,x,t):s=(p,l,d)=>d);let c=!1,u=0,f=this._roots;for(let p=0,l=f.length;p<l;p++){let d=f[p];if(c=Un(this,p,a,s,o,u),c)break;u+=d.byteLength}return q.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:o,intersectsTriangles:a}=n,s=q.getPrimitive(),r=this.geometry.index,c=this.geometry.attributes.position,u=this.indirect?x=>{let g=this.resolveTriangleIndex(x);C(s,g*3,r,c)}:x=>{C(s,x*3,r,c)},f=q.getPrimitive(),p=e.geometry.index,l=e.geometry.attributes.position,d=e.indirect?x=>{let g=e.resolveTriangleIndex(x);C(f,g*3,p,l)}:x=>{C(f,x*3,p,l)};if(a){let x=(g,b,m,h,y,v,A,T)=>{for(let w=m,_=m+h;w<_;w++){d(w),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let B=g,I=g+b;B<I;B++)if(u(B),s.needsUpdate=!0,a(s,f,B,w,y,v,A,T))return!0}return!1};if(o){let g=o;o=function(b,m,h,y,v,A,T,w){return g(b,m,h,y,v,A,T,w)?!0:x(b,m,h,y,v,A,T,w)}}else o=x}return xi(this,e,t,o)}intersectsBox(e,t){return Ae.set(e.min,e.max,t),Ae.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Ae.intersectsBox(n),intersectsTriangle:n=>Ae.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},o={},a=0,s=1/0){return(this.indirect?hi:ci)(this,e,t,n,o,a,s)}closestPointToPoint(e,t={},n=0,o=1/0){return kn(this,e,t,n,o)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{D(0,new Float32Array(n),bi),e.union(bi)}),e}};import{LineBasicMaterial as Lo,BufferAttribute as gi,Box3 as Ro,Group as zo,MeshBasicMaterial as Uo,Object3D as Vo,BufferGeometry as ko}from"./three.module.js";var vi=new Ro,nn=class extends Vo{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}constructor(e,t,n=10,o=0){super(),this.material=t,this.geometry=new ko,this.name="MeshBVHRootHelper",this.depth=n,this.displayParents=!1,this.bvh=e,this.displayEdges=!0,this._group=o}raycast(){}update(){let e=this.geometry,t=this.bvh,n=this._group;if(e.dispose(),this.visible=!1,t){let o=this.depth-1,a=this.displayParents,s=0;t.traverse((l,d)=>{if(l>=o||d)return s++,!0;a&&s++},n);let r=0,c=new Float32Array(24*s);t.traverse((l,d,x)=>{let g=l>=o||d;if(g||a){D(0,x,vi);let{min:b,max:m}=vi;for(let h=-1;h<=1;h+=2){let y=h<0?b.x:m.x;for(let v=-1;v<=1;v+=2){let A=v<0?b.y:m.y;for(let T=-1;T<=1;T+=2){let w=T<0?b.z:m.z;c[r+0]=y,c[r+1]=A,c[r+2]=w,r+=3}}}return g}},n);let u,f;this.displayEdges?f=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):f=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),c.length>65535?u=new Uint32Array(f.length*s):u=new Uint16Array(f.length*s);let p=f.length;for(let l=0;l<s;l++){let d=l*8,x=l*p;for(let g=0;g<p;g++)u[x+g]=d+f[g]}e.setIndex(new gi(u,1,!1)),e.setAttribute("position",new gi(c,3,!1)),this.visible=!0}}},on=class i extends zo{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(e){this.edgeMaterial.opacity=e,this.meshMaterial.opacity=e}constructor(e=null,t=null,n=10){e instanceof st&&(n=t||10,t=e,e=null),typeof t=="number"&&(n=t,t=null),super(),this.name="MeshBVHHelper",this.depth=n,this.mesh=e,this.bvh=t,this.displayParents=!1,this.displayEdges=!0,this._roots=[];let o=new Lo({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),a=new Uo({color:65416,transparent:!0,opacity:.3,depthWrite:!1});a.color=o.color,this.edgeMaterial=o,this.meshMaterial=a,this.update()}update(){let e=this.bvh||this.mesh.geometry.boundsTree,t=e?e._roots.length:0;for(;this._roots.length>t;){let n=this._roots.pop();n.geometry.dispose(),this.remove(n)}for(let n=0;n<t;n++){let{depth:o,edgeMaterial:a,meshMaterial:s,displayParents:r,displayEdges:c}=this;if(n>=this._roots.length){let f=new nn(e,a,o,n);this.add(f),this._roots.push(f)}let u=this._roots[n];u.bvh=e,u.depth=o,u.displayParents=r,u.displayEdges=c,u.material=c?a:s,u.update()}}updateMatrixWorld(...e){let t=this.mesh,n=this.parent;t!==null&&(t.updateWorldMatrix(!0,!1),n?this.matrix.copy(n.matrixWorld).invert().multiply(t.matrixWorld):this.matrix.copy(t.matrixWorld),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...e)}copy(e){this.depth=e.depth,this.mesh=e.mesh,this.bvh=e.bvh,this.opacity=e.opacity,this.color.copy(e.color)}clone(){return new i(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].geometry.dispose()}};import{Box3 as sn,Vector3 as Oo}from"./three.module.js";var kt=new sn,Ti=new sn,_t=new Oo;function wi(i){switch(typeof i){case"number":return 8;case"string":return i.length*2;case"boolean":return 4;default:return 0}}function Ho(i){return/(Uint|Int|Float)(8|16|32)Array/.test(i.constructor.name)}function qo(i,e){let t={nodeCount:0,leafNodeCount:0,depth:{min:1/0,max:-1/0},tris:{min:1/0,max:-1/0},splits:[0,0,0],surfaceAreaScore:0};return i.traverse((n,o,a,s,r)=>{let c=a[3]-a[0],u=a[4]-a[1],f=a[5]-a[2],p=2*(c*u+u*f+f*c);t.nodeCount++,o?(t.leafNodeCount++,t.depth.min=Math.min(n,t.depth.min),t.depth.max=Math.max(n,t.depth.max),t.tris.min=Math.min(r,t.tris.min),t.tris.max=Math.max(r,t.tris.max),t.surfaceAreaScore+=p*1.25*r):(t.splits[s]++,t.surfaceAreaScore+=p*1)},e),t.tris.min===1/0&&(t.tris.min=0,t.tris.max=0),t.depth.min===1/0&&(t.depth.min=0,t.depth.max=0),t}function Wo(i){return i._roots.map((e,t)=>qo(i,t))}function Xo(i){let e=new Set,t=[i],n=0;for(;t.length;){let o=t.pop();if(!e.has(o)){e.add(o);for(let a in o){if(!o.hasOwnProperty(a))continue;n+=wi(a);let s=o[a];s&&(typeof s=="object"||typeof s=="function")?Ho(s)||ye()&&s instanceof SharedArrayBuffer||s instanceof ArrayBuffer?n+=s.byteLength:t.push(s):n+=wi(s)}}}return n}function Go(i){let e=i.geometry,t=[],n=e.index,o=e.getAttribute("position"),a=!0;return i.traverse((s,r,c,u,f)=>{let p={depth:s,isLeaf:r,boundingData:c,offset:u,count:f};t[s]=p,D(0,c,kt);let l=t[s-1];if(r)for(let d=u,x=u+f;d<x;d++){let g=i.resolveTriangleIndex(d),b=3*g,m=3*g+1,h=3*g+2;n&&(b=n.getX(b),m=n.getX(m),h=n.getX(h));let y;_t.fromBufferAttribute(o,b),y=kt.containsPoint(_t),_t.fromBufferAttribute(o,m),y=y&&kt.containsPoint(_t),_t.fromBufferAttribute(o,h),y=y&&kt.containsPoint(_t),console.assert(y,"Leaf bounds does not fully contain triangle."),a=a&&y}if(l){D(0,c,Ti);let d=Ti.containsBox(kt);console.assert(d,"Parent bounds does not fully contain child."),a=a&&d}}),a}function Yo(i){let e=[];return i.traverse((t,n,o,a,s)=>{let r={bounds:D(0,o,new sn)};n?(r.count=s,r.offset=a):(r.left=null,r.right=null),e[t]=r;let c=e[t-1];c&&(c.left===null?c.left=r:c.right=r)}),e[0]}import{Ray as jo,Matrix4 as Zo,Mesh as Ko}from"./three.module.js";function rn(i,e,t){return i===null||(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i.distance<t.near||i.distance>t.far)?null:i}var cn=new jo,Bi=new Zo,$o=Ko.prototype.raycast;function Jo(i,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Bi.copy(this.matrixWorld).invert(),cn.copy(i.ray).applyMatrix4(Bi);let t=this.geometry.boundsTree;if(i.firstHitOnly===!0){let n=rn(t.raycastFirst(cn,this.material),this,i);n&&e.push(n)}else{let n=t.raycast(cn,this.material);for(let o=0,a=n.length;o<a;o++){let s=rn(n[o],this,i);s&&e.push(s)}}}else $o.call(this,i,e)}function Qo(i){return this.boundsTree=new st(this,i),this.boundsTree}function ts(){this.boundsTree=null}import{DataTexture as Ei,FloatType as fs,UnsignedIntType as us,RGBAFormat as ps,RGIntegerFormat as ds,NearestFilter as _e,BufferAttribute as ms}from"./three.module.js";import{DataTexture as es,FloatType as ge,IntType as ve,UnsignedIntType as Te,ByteType as _i,UnsignedByteType as Si,ShortType as ns,UnsignedShortType as is,RedFormat as os,RGFormat as ss,RGBAFormat as an,RedIntegerFormat as rs,RGIntegerFormat as cs,RGBAIntegerFormat as ln,NearestFilter as Ii}from"./three.module.js";function as(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function ls(i){switch(i){case 1:return os;case 2:return ss;case 3:return an;case 4:return an}}function Pi(i){switch(i){case 1:return rs;case 2:return cs;case 3:return ln;case 4:return ln}}var Ot=class extends es{constructor(){super(),this.minFilter=Ii,this.magFilter=Ii,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,o=e.count;if(t!==null){if(n*o%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=o*n/t}let a=e.itemSize,s=e.count,r=e.normalized,c=e.array.constructor,u=c.BYTES_PER_ELEMENT,f=this._forcedType,p=a;if(f===null)switch(c){case Float32Array:f=ge;break;case Uint8Array:case Uint16Array:case Uint32Array:f=Te;break;case Int8Array:case Int16Array:case Int32Array:f=ve;break}let l,d,x,g,b=as(a);switch(f){case ge:x=1,d=ls(a),r&&u===1?(g=c,b+="8",c===Uint8Array?l=Si:(l=_i,b+="_SNORM")):(g=Float32Array,b+="32F",l=ge);break;case ve:b+=u*8+"I",x=r?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,d=Pi(a),u===1?(g=Int8Array,l=_i):u===2?(g=Int16Array,l=ns):(g=Int32Array,l=ve);break;case Te:b+=u*8+"UI",x=r?Math.pow(2,c.BYTES_PER_ELEMENT*8-1):1,d=Pi(a),u===1?(g=Uint8Array,l=Si):u===2?(g=Uint16Array,l=is):(g=Uint32Array,l=Te);break}p===3&&(d===an||d===ln)&&(p=4);let m=Math.ceil(Math.sqrt(s))||1,h=p*m*m,y=new g(h),v=e.normalized;e.normalized=!1;for(let A=0;A<s;A++){let T=p*A;y[T]=e.getX(A)/x,a>=2&&(y[T+1]=e.getY(A)/x),a>=3&&(y[T+2]=e.getZ(A)/x,p===4&&(y[T+3]=1)),a>=4&&(y[T+3]=e.getW(A)/x)}e.normalized=v,this.internalFormat=b,this.format=d,this.type=l,this.image.width=m,this.image.height=m,this.image.data=y,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=o}},we=class extends Ot{constructor(){super(),this._forcedType=Te}},Mi=class extends Ot{constructor(){super(),this._forcedType=ve}},Be=class extends Ot{constructor(){super(),this._forcedType=ge}};var Di=class{constructor(){this.index=new we,this.position=new Be,this.bvhBounds=new Ei,this.bvhContents=new Ei,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(xs(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let o=De(Ee(t));this._cachedIndexAttr=new ms(o,1,!1)}hs(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:o}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),o&&o.dispose()}};function hs(i,e,t){let n=t.array,o=i.index?i.index.array:null;for(let a=0,s=e.length;a<s;a++){let r=3*a,c=3*e[a];for(let u=0;u<3;u++)n[r+u]=o?o[c+u]:c+u}}function xs(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let o=n[0],a=new Uint16Array(o),s=new Uint32Array(o),r=new Float32Array(o),c=o.byteLength/32,u=2*Math.ceil(Math.sqrt(c/2)),f=new Float32Array(4*u*u),p=Math.ceil(Math.sqrt(c)),l=new Uint32Array(2*p*p);for(let d=0;d<c;d++){let x=d*32/4,g=x*2,b=x;for(let m=0;m<3;m++)f[8*d+0+m]=r[b+0+m],f[8*d+4+m]=r[b+3+m];if(L(g,a)){let m=z(g,a),h=R(x,s),y=4294901760|m;l[d*2+0]=y,l[d*2+1]=h}else{let m=4*k(x,s)/32,h=ut(x,s);l[d*2+0]=h,l[d*2+1]=m}}e.image.data=f,e.image.width=u,e.image.height=u,e.format=ps,e.type=fs,e.internalFormat="RGBA32F",e.minFilter=_e,e.magFilter=_e,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=l,t.image.width=p,t.image.height=p,t.format=ds,t.type=us,t.internalFormat="RG32UI",t.minFilter=_e,t.magFilter=_e,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}import{BufferAttribute as dn,BufferGeometry as Pe,Vector3 as Wt,Vector4 as mn,Matrix4 as hn,Matrix3 as ys}from"./three.module.js";var rt=new Wt,ct=new Wt,at=new Wt,Fi=new mn,Se=new Wt,fn=new Wt,Ni=new mn,Ci=new mn,Ie=new hn,Li=new hn;function Ht(i,e){if(!i&&!e)return;let t=i.count===e.count,n=i.normalized===e.normalized,o=i.array.constructor===e.array.constructor,a=i.itemSize===e.itemSize;if(!t||!n||!o||!a)throw new Error}function qt(i,e=null){let t=i.array.constructor,n=i.normalized,o=i.itemSize,a=e===null?i.count:e;return new dn(new t(o*a),o,n)}function Ui(i,e,t=0){if(i.isInterleavedBufferAttribute){let n=i.itemSize;for(let o=0,a=i.count;o<a;o++){let s=o+t;e.setX(s,i.getX(o)),n>=2&&e.setY(s,i.getY(o)),n>=3&&e.setZ(s,i.getZ(o)),n>=4&&e.setW(s,i.getW(o))}}else{let n=e.array,o=n.constructor,a=n.BYTES_PER_ELEMENT*i.itemSize*t;new o(n.buffer,a,i.array.length).set(i.array)}}function bs(i,e,t){let n=i.elements,o=e.elements;for(let a=0,s=o.length;a<s;a++)n[a]+=o[a]*t}function Ri(i,e,t){let n=i.skeleton,o=i.geometry,a=n.bones,s=n.boneInverses;Ni.fromBufferAttribute(o.attributes.skinIndex,e),Ci.fromBufferAttribute(o.attributes.skinWeight,e),Ie.elements.fill(0);for(let r=0;r<4;r++){let c=Ci.getComponent(r);if(c!==0){let u=Ni.getComponent(r);Li.multiplyMatrices(a[u].matrixWorld,s[u]),bs(Ie,Li,c)}}return Ie.multiply(i.bindMatrix).premultiply(i.bindMatrixInverse),t.transformDirection(Ie),t}function un(i,e,t,n,o){Se.set(0,0,0);for(let a=0,s=i.length;a<s;a++){let r=e[a],c=i[a];r!==0&&(fn.fromBufferAttribute(c,n),t?Se.addScaledVector(fn,r):Se.addScaledVector(fn.sub(o),r))}o.add(Se)}function As(i,e={useGroups:!1,updateIndex:!1,skipAttributes:[]},t=new Pe){let n=i[0].index!==null,{useGroups:o=!1,updateIndex:a=!1,skipAttributes:s=[]}=e,r=new Set(Object.keys(i[0].attributes)),c={},u=0;t.clearGroups();for(let f=0;f<i.length;++f){let p=i[f],l=0;if(n!==(p.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let d in p.attributes){if(!r.has(d))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.');c[d]===void 0&&(c[d]=[]),c[d].push(p.attributes[d]),l++}if(l!==r.size)throw new Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");if(o){let d;if(n)d=p.index.count;else if(p.attributes.position!==void 0)d=p.attributes.position.count;else throw new Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");t.addGroup(u,d,f),u+=d}}if(n){let f=!1;if(!t.index){let p=0;for(let l=0;l<i.length;++l)p+=i[l].index.count;t.setIndex(new dn(new Uint32Array(p),1,!1)),f=!0}if(a||f){let p=t.index,l=0,d=0;for(let x=0;x<i.length;++x){let g=i[x],b=g.index;if(s[x]!==!0)for(let m=0;m<b.count;++m)p.setX(l,b.getX(m)+d),l++;d+=g.attributes.position.count}}}for(let f in c){let p=c[f];if(!(f in t.attributes)){let x=0;for(let g in p)x+=p[g].count;t.setAttribute(f,qt(c[f][0],x))}let l=t.attributes[f],d=0;for(let x=0,g=p.length;x<g;x++){let b=p[x];s[x]!==!0&&Ui(b,l,d),d+=b.count}}return t}function gs(i,e){if(i===null||e===null)return i===e;if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function vs(i){let{index:e,attributes:t}=i;if(e)for(let n=0,o=e.count;n<o;n+=3){let a=e.getX(n),s=e.getX(n+2);e.setX(n,s),e.setX(n+2,a)}else for(let n in t){let o=t[n],a=o.itemSize;for(let s=0,r=o.count;s<r;s+=3)for(let c=0;c<a;c++){let u=o.getComponent(s,c),f=o.getComponent(s+2,c);o.setComponent(s,c,f),o.setComponent(s+2,c,u)}}return i}var pn=class{constructor(e){this.matrixWorld=new hn,this.geometryHash=null,this.boneMatrices=null,this.primitiveCount=-1,this.mesh=e,this.update()}update(){let e=this.mesh,t=e.geometry,n=e.skeleton,o=(t.index?t.index.count:t.attributes.position.count)/3;if(this.matrixWorld.copy(e.matrixWorld),this.geometryHash=t.attributes.position.version,this.primitiveCount=o,n){n.boneTexture||n.computeBoneTexture(),n.update();let a=n.boneMatrices;!this.boneMatrices||this.boneMatrices.length!==a.length?this.boneMatrices=a.slice():this.boneMatrices.set(a)}else this.boneMatrices=null}didChange(){let e=this.mesh,t=e.geometry,n=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===t.attributes.position.version&&gs(e.skeleton&&e.skeleton.boneMatrices||null,this.boneMatrices)&&this.primitiveCount===n)}},zi=class{constructor(e){Array.isArray(e)||(e=[e]);let t=[];e.forEach(n=>{n.traverseVisible(o=>{o.isMesh&&t.push(o)})}),this.meshes=t,this.useGroups=!0,this.applyWorldTransforms=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Array(t.length).fill().map(()=>new Pe),this._diffMap=new WeakMap}getMaterials(){let e=[];return this.meshes.forEach(t=>{Array.isArray(t.material)?e.push(...t.material):e.push(t.material)}),e}generate(e=new Pe){let t=[],{meshes:n,useGroups:o,_intermediateGeometry:a,_diffMap:s}=this;for(let r=0,c=n.length;r<c;r++){let u=n[r],f=a[r],p=s.get(u);!p||p.didChange(u)?(this._convertToStaticGeometry(u,f),t.push(!1),p?p.update():s.set(u,new pn(u))):t.push(!0)}if(a.length===0){e.setIndex(null);let r=e.attributes;for(let c in r)e.deleteAttribute(c);for(let c in this.attributes)e.setAttribute(this.attributes[c],new dn(new Float32Array(0),4,!1))}else As(a,{useGroups:o,skipAttributes:t},e);for(let r in e.attributes)e.attributes[r].needsUpdate=!0;return e}_convertToStaticGeometry(e,t=new Pe){let n=e.geometry,o=this.applyWorldTransforms,a=this.attributes.includes("normal"),s=this.attributes.includes("tangent"),r=n.attributes,c=t.attributes;!t.index&&n.index&&(t.index=n.index.clone()),c.position||t.setAttribute("position",qt(r.position)),a&&!c.normal&&r.normal&&t.setAttribute("normal",qt(r.normal)),s&&!c.tangent&&r.tangent&&t.setAttribute("tangent",qt(r.tangent)),Ht(n.index,t.index),Ht(r.position,c.position),a&&Ht(r.normal,c.normal),s&&Ht(r.tangent,c.tangent);let u=r.position,f=a?r.normal:null,p=s?r.tangent:null,l=n.morphAttributes.position,d=n.morphAttributes.normal,x=n.morphAttributes.tangent,g=n.morphTargetsRelative,b=e.morphTargetInfluences,m=new ys;m.getNormalMatrix(e.matrixWorld),n.index&&t.index.array.set(n.index.array);for(let h=0,y=r.position.count;h<y;h++)rt.fromBufferAttribute(u,h),f&&ct.fromBufferAttribute(f,h),p&&(Fi.fromBufferAttribute(p,h),at.fromBufferAttribute(p,h)),b&&(l&&un(l,b,g,h,rt),d&&un(d,b,g,h,ct),x&&un(x,b,g,h,at)),e.isSkinnedMesh&&(e.applyBoneTransform(h,rt),f&&Ri(e,h,ct),p&&Ri(e,h,at)),o&&rt.applyMatrix4(e.matrixWorld),c.position.setXYZ(h,rt.x,rt.y,rt.z),f&&(o&&ct.applyNormalMatrix(m),c.normal.setXYZ(h,ct.x,ct.y,ct.z)),p&&(o&&at.transformDirection(e.matrixWorld),c.tangent.setXYZW(h,at.x,at.y,at.z,Fi.w));for(let h in this.attributes){let y=this.attributes[h];y==="position"||y==="tangent"||y==="normal"||!(y in r)||(c[y]||t.setAttribute(y,qt(r[y])),Ht(r[y],c[y]),Ui(r[y],c[y]))}return e.matrixWorld.determinant()<0&&vs(t),t}};var gn={};ki(gn,{bvh_distance_functions:()=>yn,bvh_ray_functions:()=>bn,bvh_struct_definitions:()=>An,common_functions:()=>xn});var xn=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var yn=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var bn=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;var An=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var Va=An,ka=yn,Oa=`
	${xn}
	${bn}
`;export{vn as AVERAGE,gn as BVHShaderGLSL,Xt as CENTER,Me as CONTAINED,H as ExtendedTriangle,Be as FloatVertexAttributeTexture,Hi as INTERSECTED,Mi as IntVertexAttributeTexture,st as MeshBVH,on as MeshBVHHelper,Di as MeshBVHUniformStruct,Oi as NOT_INTERSECTED,U as OrientedBox,Tn as SAH,zi as StaticGeometryGenerator,we as UIntVertexAttributeTexture,Ot as VertexAttributeTexture,Jo as acceleratedRaycast,Qo as computeBoundsTree,ts as disposeBoundsTree,Xo as estimateMemoryInBytes,Wo as getBVHExtremes,Yo as getJSONStructure,lo as getTriangleHitPointInfo,ka as shaderDistanceFunction,Oa as shaderIntersectFunction,Va as shaderStructs,Go as validateBounds};
//# sourceMappingURL=three-mesh-bvh.bundle.mjs.map