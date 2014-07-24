#version 330

// 5x5 �ړ����σt�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// �I�t�Z�b�g
const ivec2 offset[] = ivec2[](

  ivec2(-2, -2),
  ivec2(-1, -2),
  ivec2( 0, -2),
  ivec2( 1, -2),
  ivec2( 2, -2),
        
  ivec2(-2, -1),
  ivec2(-1, -1),
  ivec2( 0, -1),
  ivec2( 1, -1),
  ivec2( 2, -1),
        
  ivec2(-2,  0),
  ivec2(-1,  0),
  ivec2( 1,  0),
  ivec2( 2,  0),
        
  ivec2(-2,  1),
  ivec2(-1,  1),
  ivec2( 0,  1),
  ivec2( 1,  1),
  ivec2( 2,  1),
        
  ivec2(-2,  2),
  ivec2(-1,  2),
  ivec2( 0,  2),
  ivec2( 1,  2),
  ivec2( 2,  2)

);

// ���ς����߂�
void main(void)
{
  vec4 sum = texture(image, gl_FragCoord.xy);

  for (int i = 0; i < offset.length(); ++i)
    sum += textureOffset(image, gl_FragCoord.xy, offset[i]);

  fc = sum / (offset.length() + 1);
}
