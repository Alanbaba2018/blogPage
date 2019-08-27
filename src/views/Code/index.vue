<template>
  <div class="code-wrap">
    <el-row type="flex" :gutter="20" style="height: 95%">
      <el-col :span="12" class="left-panel">
        <div class="code-editor single-panel" id="monaco" ref="codePanel"></div>
      </el-col>
      <el-col :span="12" class="right-panel">
        <el-button-group class="xCanvas-toolbar" v-show="showToolBar">
          <el-button size="small" round @click="activeActions('point')">点</el-button>
          <el-button size="small" round @click="activeActions('polygon')">多边形</el-button>
          <el-button size="small" round @click="activeActions('line')">线</el-button>
          <el-button size="small" round @click="activeActions('arrow')">箭头</el-button>
          <el-button size="small" round @click="activeActions('clear')">清空</el-button>
        </el-button-group>
        <div class="result-wrap single-panel" id="stage" ref="resultPanel"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="handle-row">
      <el-col :span="12">
        <el-button type="primary" size="small" class="compile-btn" @click="compile">运行</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import Http from '@/api/index.js';

export default {
  name: 'Code',
  data() {
    return {
      editor: null,
      isCompile: false,
      showToolBar: false,
      stage: null,
      crossHLine: '',
      crossVLine: '',
      alpha: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
      index: 0,
    };
  },
  mounted() {
    this.isCompile = this.$route.query.compile === 'false' ? false : true;
    this.showToolBar = this.$route.query.mode === 'default';
    this.initEditor();
    this.initCode();
    window.addEventListener('resize', this.resize);
    if (this.showToolBar) {
      this.initXCanvas();
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.initEditor();
      if (this.isCompile) {
        this.compile();
      }
    },
    initEditor() {
      let codes = '';
      if (this.editor) {
        codes = this.editor.getValue();
      }
      const lang = this.$route.query.lang || 'javascript';
      this.$refs.codePanel.innerHTML = '';
      this.editor = monaco.editor.create(document.getElementById('monaco'), {
        value: null,
        language: lang
      });
      
      if (codes) {
        this.editor.setValue(codes);
      }
    },
    initCode() {
      const index = this.$route.params.codeIndex;
      Http.getCodeString(index).then(res => {
        this.editor.setValue(res);
        if (this.isCompile) {
          this.compile();
        }
      });
    },
    compile() {
      const el = this.$refs.resultPanel;
      const childNodes = el.childNodes;
      for (let i = childNodes.length - 1; i >= 0; i--) {
        el.removeChild(childNodes[i]);
      }
      const code = this.editor.getValue();
      const fn = new Function(code);
      fn.call(this);
    },
    initXCanvas() {
      this.stage = new xCanvas.Stage('stage', {zoomChange: 0.5, zoom: 1, maxZoom: 100});
      this.crossHLine = new xCanvas.Polyline([], {dashArray: [5, 3]}).addTo(this.stage);
      this.crossVLine = new xCanvas.Polyline([], {dashArray: [5, 3]}).addTo(this.stage);
    },
    activeActions(action) {
      const actions = {
        point: this.drawPoint,
        polygon: this.drawPolygon,
        line: this.drawLine,
        arrow: this.drawArrow,
        clear: this.clearAll
      };
      if (actions[action]) {
        actions[action]();
      }
    },
    drawPoint() {
      const stage = this.stage;
      stage.once('click', e => {
        const circle = new xCanvas.Circle(e.pos, 5, { fill: true, color: '#ff0000'});
        stage.addLayer(circle);
        this.reset();
      });
    },
    drawPolygon() {
      const stage = this.stage;
      const plg = new xCanvas.Polygon([], {fill: false}).addTo(stage);
      const cache = [];
      const move = (ev) => {
        const endPos = ev.pos;
        plg.setGeometry([...cache, endPos]);
      };
      const down = (e) => {
        if (e.sourceTarget.button === 2) {
          stage.off('mousedown', down);
          stage.off('mousemove', move);
          stage.enableDrag();
          this.reset();
          return;
        }
        stage.disableDrag();
        cache.push(e.pos);
      };
      stage.on('mousedown', down);
      stage.on('mousemove', move);
    },
    drawLine() {
      const stage = this.stage;
      const ply = new xCanvas.Polyline([]).addTo(stage);
      const cache = [];
      stage.on('mousedown', e => {
        cache.push(e.pos);
        if (e.sourceTarget.button === 2) {
          stage.off('mousedown');
          stage.off('mousemove');
          this.reset();
          return;
        }
        stage.on('mousemove', ev => {
          ply.setGeometry([...cache, ev.pos]);
        });
      })
    },
    drawArrow() {
      const stage = this.stage;
      stage.on('mousedown', e => {
        stage.disableDrag();
        const line = new xCanvas.Polyline([e.pos, e.pos]);
        const arrow = new xCanvas.Polygon([], { fill: true});
        const layerGroup = new xCanvas.LayerGroup([line, arrow]).addTo(stage);
        const text = this.alpha[this.index % this.alpha.length];
        this.index++;
        stage.on('mousemove', ev => {
          line.setLastVertex(ev.pos);
          arrow.setGeometry(this.getArrowData(...line.getGeometry()));
        });
        stage.once('mouseup', () => {
          stage.off('mousedown');
          stage.off('mousemove');
          const bound = layerGroup.getBound();
          const iText = new xCanvas.IText(bound.getCenter(), text, { color: '#000000', weight: 2}).addTo(stage);
          stage.enableDrag();
          this.reset();
        })
      })
    },
    getArrowData(v1, v2) {
      const p = new xCanvas.Math.Vector2(v1);
      const q = new xCanvas.Math.Vector2(v2);
      const dir = new xCanvas.Math.Vector2(q.x - p.x, q.y - p.y);
      const oppositDir = dir.clone().rotate(180).normalize();
      const angle = 60;
      const len = 10;
      const p1 = q.clone().add(oppositDir.clone().rotate(angle / 2).scale(len));
      const p2 = q.clone().add(oppositDir.clone().rotate(-angle / 2).scale(len));
      return [v2, [p1.x, p1.y], [p2.x, p2.y]];
    },
    reset() {
      this.stage.on('mousemove', e => {
        const {x, y, width, height } = this.stage.getBound();
        this.crossHLine.setGeometry([[x, e.pos[1]], [x + width, e.pos[1]]]);
        this.crossVLine.setGeometry([[e.pos[0], y], [e.pos[0], y + height]]);
      })
    },
    clearAll() {
      this.stage.clearAllLayers();
      this.crossHLine = new xCanvas.Polyline([], {dashArray: [5, 3]}).addTo(this.stage);
      this.crossVLine = new xCanvas.Polyline([], {dashArray: [5, 3]}).addTo(this.stage);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.code-wrap {
  height: 100%;
  padding: 20px 15px;
  .single-panel {
    height: 100%;
    border: 1px solid $gray-light-color;
  }
  .right-panel {
    position: relative;
    .xCanvas-toolbar {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 100;
    }
    .result-wrap {
      position: relative;
      cursor: pointer;
    }
  }
  
  .handle-row {
    margin-top: 10px;
    text-align: right;
    .compile-btn {
      padding: 9px 20px;
      margin-right: 15px;
    }
  }
}
</style>
